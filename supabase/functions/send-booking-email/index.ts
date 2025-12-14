import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import sgMail from "npm:@sendgrid/mail@8.1.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailPayload {
  to: string;
  templateData: {
    parentName: string;
    childName: string;
    className: string;
    classDate: string;
    classTime: string;
    location: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Invalid credentials");
    }

    const { to, templateData }: EmailPayload = await req.json();

    if (!to || !templateData) {
      throw new Error("Missing required fields");
    }

    sgMail.setApiKey(Deno.env.get("SENDGRID_API_KEY") ?? "");

    await sgMail.send({
      to,
      from: "bookings@learnbysensory.com",
      templateId: "d-123456789",
      dynamicTemplateData: templateData,
    });

    await sgMail.send({
      to: "Jysseka@learnbysensory.com",
      from: "bookings@learnbysensory.com",
      templateId: "d-987654321",
      dynamicTemplateData: {
        ...templateData,
        parentEmail: to,
      },
    });

    return new Response(
      JSON.stringify({ message: "Emails sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});