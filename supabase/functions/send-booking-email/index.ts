import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import sgMail from 'npm:@sendgrid/mail@8.1.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Verify auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid credentials');
    }

    // Get request payload
    const { to, templateData }: EmailPayload = await req.json();

    if (!to || !templateData) {
      throw new Error('Missing required fields');
    }

    // Initialize SendGrid
    sgMail.setApiKey(Deno.env.get('SENDGRID_API_KEY') ?? '');

    // Send confirmation email to parent
    await sgMail.send({
      to,
      from: 'bookings@learnbysensory.com', // Updated domain
      templateId: 'd-123456789', // Replace with your SendGrid template ID
      dynamicTemplateData: templateData,
    });

    // Send notification to admin
    await sgMail.send({
      to: 'Jysseka@learnbysensory.com', // Updated admin email
      from: 'bookings@learnbysensory.com', // Updated domain
      templateId: 'd-987654321', // Replace with your admin notification template ID
      dynamicTemplateData: {
        ...templateData,
        parentEmail: to,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Emails sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});