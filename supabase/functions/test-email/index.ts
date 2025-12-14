import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const sendGridApiKey = Deno.env.get("SENDGRID_API_KEY");
    
    const testResults = {
      timestamp: new Date().toISOString(),
      environment: {
        supabaseUrl: Deno.env.get("SUPABASE_URL") ? "Available" : "Missing",
        supabaseAnonKey: Deno.env.get("SUPABASE_ANON_KEY") ? "Available" : "Missing",
        sendGridApiKey: sendGridApiKey ? "Available" : "Missing",
      },
      tests: {
        environmentVariables: sendGridApiKey ? "PASS" : "FAIL",
        sendGridConnection: "PENDING"
      }
    };

    if (sendGridApiKey) {
      try {
        const response = await fetch("https://api.sendgrid.com/v3/user/profile", {
          headers: {
            "Authorization": `Bearer ${sendGridApiKey}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          testResults.tests.sendGridConnection = "PASS";
        } else {
          testResults.tests.sendGridConnection = `FAIL - Status: ${response.status}`;
        }
      } catch (error) {
        testResults.tests.sendGridConnection = `FAIL - Error: ${error.message}`;
      }
    }

    return new Response(
      JSON.stringify(testResults, null, 2),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: "Test failed",
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
});