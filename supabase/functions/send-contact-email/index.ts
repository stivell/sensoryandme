import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactFormData = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const apiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "SendGrid API key not configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const fromEmail = "jysseka@learnbysensory.com";
    const fromName = "Learn by Sensory";

    // Send notification to admin
    const adminRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: "jysseka@learnbysensory.com", name: "Jysseka Campbell-George" }],
          subject: `New Contact Form Submission: ${subject}`,
        }],
        from: { email: fromEmail, name: `${fromName} Contact Form` },
        reply_to: { email: email, name: name },
        content: [{
          type: "text/html",
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#f5f5f5;padding:15px;border-radius:5px;margin:10px 0;">
              ${message.replace(/\n/g, "<br>")}
            </div>
            <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
            <hr>
            <p><small>Reply directly to this email to respond to ${name} at ${email}.</small></p>
          `,
        }],
      }),
    });

    if (!adminRes.ok) {
      const body = await adminRes.text();
      console.error("Admin email failed:", adminRes.status, body);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: body }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Send confirmation to submitter
    const userRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: email, name: name }],
          subject: "Thank you for contacting Learn by Sensory",
        }],
        from: { email: fromEmail, name: fromName },
        content: [{
          type: "text/html",
          value: `
            <h2>Thank you for contacting Learn by Sensory</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p>Here is a copy of your message:</p>
            <div style="background:#f5f5f5;padding:15px;border-radius:5px;margin:10px 0;">
              <p><strong>Subject:</strong> ${subject}</p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            <p>Best regards,<br>The Learn by Sensory Team</p>
            <hr>
            <p><small>This is an automated response. Please do not reply to this email.</small></p>
          `,
        }],
      }),
    });

    if (!userRes.ok) {
      const body = await userRes.text();
      console.error("User confirmation email failed:", userRes.status, body);
    }

    return new Response(
      JSON.stringify({ message: "Message sent successfully", timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process contact form", details: error instanceof Error ? error.message : "Unknown error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
