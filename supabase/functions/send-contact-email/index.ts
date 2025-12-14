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
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, subject, message }: ContactFormData = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const apiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!apiKey) {
      console.error("SendGrid API key is not configured");
      return new Response(
        JSON.stringify({ 
          error: "Email service is not configured properly",
          details: "SendGrid API key is missing from environment variables"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const testResponse = await fetch("https://api.sendgrid.com/v3/user/profile", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!testResponse.ok) {
      console.error("SendGrid API key validation failed:", testResponse.status);
      return new Response(
        JSON.stringify({ 
          error: "Email service configuration error",
          details: `SendGrid API key validation failed with status ${testResponse.status}`
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const verifiedSenderEmail = "noreply@learnbysensory.com";
    const verifiedSenderName = "Learn by Sensory";

    const adminEmailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: "Jysseka@learnbysensory.com", name: "Jysseka Campbell-George" }],
          subject: `New Contact Form Submission: ${subject}`,
          custom_args: {
            "contact_form": "true",
            "original_sender": email
          }
        }],
        from: { 
          email: verifiedSenderEmail, 
          name: `${verifiedSenderName} Contact Form` 
        },
        reply_to: { 
          email: email, 
          name: name 
        },
        content: [{
          type: "text/html",
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${message.replace(/\n/g, "<br>")}
            </div>
            <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
            <hr>
            <p><small><strong>Note:</strong> This message was sent through the contact form. You can reply directly to this email to respond to ${name} at ${email}.</small></p>
          `
        }]
      })
    });

    if (!adminEmailResponse.ok) {
      const errorText = await adminEmailResponse.text();
      console.error("Failed to send admin email:", adminEmailResponse.status, errorText);
      
      let errorDetails = `HTTP ${adminEmailResponse.status}`;
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.errors && errorData.errors.length > 0) {
          errorDetails = errorData.errors[0].message || errorDetails;
        }
      } catch (e) {
      }
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to send message",
          details: `Email delivery failed: ${errorDetails}. Please ensure your SendGrid sender email is verified.`,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const userEmailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: email, name: name }],
          subject: "Thank you for contacting Learn by Sensory"
        }],
        from: { 
          email: verifiedSenderEmail, 
          name: verifiedSenderName 
        },
        content: [{
          type: "text/html",
          value: `
            <h2>Thank you for contacting Learn by Sensory</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p>For reference, here is a copy of your message:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            <br>
            <p>Best regards,</p>
            <p>The Learn by Sensory Team</p>
            <hr>
            <p><small>This is an automated response. Please do not reply to this email.</small></p>
          `
        }]
      })
    });

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();
      console.error("Failed to send user confirmation email:", userEmailResponse.status, errorText);
    }

    return new Response(
      JSON.stringify({ 
        message: "Message sent successfully",
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process contact form",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});