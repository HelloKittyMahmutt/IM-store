import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const key = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;
    if (!key) {
      return res.status(500).json({ error: 'RESEND_API_KEY environment variable is required' });
    }

    const resend = new Resend(key);
    
    // Add to Resend Audience if configured
    const audienceId = process.env.VITE_RESEND_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: firstName || '',
          audienceId: audienceId,
        });
      } catch (contactError) {
        console.error('Failed to add contact to audience:', contactError);
      }
    }

    // Email clients (Gmail/Apple Mail) block images from secure dev environments like AI Studio.
    // We MUST use a public CDN like GitHub for the image to render in emails.
    const logoSolidBlackUrl = 'https://raw.githubusercontent.com/HelloKittyMahmutt/IM-store/main/public/logo-solid-black.png';
    const displayFirstName = firstName ? firstName.toUpperCase() : 'THERE';

    // Send a welcome email
    await resend.emails.send({
      from: 'IM <hello@imwearmovement.com>',
      to: email,
      subject: 'You are on the list.',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="color-scheme" content="dark">
          <meta name="supported-color-schemes" content="dark">
          <style>
            body { margin: 0; padding: 0; background-color: #000000 !important; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; }
            .text-white { color: #ffffff !important; }
            .text-grey { color: #aaaaaa !important; }
            .text-dark-grey { color: #888888 !important; }
            .text-darker-grey { color: #555555 !important; }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; width: 100% !important;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000000" style="background-color: #000000; margin: 0; padding: 0; width: 100% !important;">
            <tr>
              <td align="center" valign="top" style="background-color: #000000; padding: 0;" bgcolor="#000000">
                <!-- Full width header image and status -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #000000;" bgcolor="#000000">
                  <tr>
                    <td align="center" valign="top" style="padding: 0; background-color: #000000;" bgcolor="#000000">
                      <img src="${logoSolidBlackUrl}" alt="IM Logo" width="600" style="display: block; width: 100%; max-width: 600px; height: 280px; object-fit: cover; object-position: center; margin: 0 auto; padding: 0; border: 0;" />
                      <div style="color: #888888; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; padding: 10px 20px 15px 20px; background-color: #000000;">
                        STATUS: SECURED. THIS INBOX IS NOW YOUR ONLY ACCESS POINT. THERE IS NO OTHER WAY TO GET THE KEY.
                      </div>
                    </td>
                  </tr>
                </table>
                
                <!-- Email Content -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; background-color: #000000;" bgcolor="#000000">
                  <tr>
                    <td align="center" bgcolor="#000000" style="background-color: #000000; padding: 0px 20px 20px 20px;">
                      
                      <h2 class="text-white" style="font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 15px; color: #ffffff; line-height: 1.4;">
                        Your place is secured.<br/>But is your future self secured within you?
                      </h2>
                      
                      <div class="text-white" style="font-size: 14px; line-height: 1.6; margin: 0 auto 20px auto; letter-spacing: 0.05em; color: #ffffff; text-align: left;">
                        <p style="margin-bottom: 16px;">Your mind is a liar, <strong class="text-white" style="color: #ffffff; font-weight: bold;">${displayFirstName}</strong>. It invents fake limits to keep you safe. Most people surrender to that illusion.</p>
                        
                        <p style="margin-bottom: 16px;">This brand is an incubator for the obsessed. If you are reading this, you are one of them.</p>

                        <p style="margin-bottom: 16px;">On <strong class="text-white" style="color: #ffffff;">10 . 31 . 26</strong>, the countdown hits zero.</p>
                        
                        <p style="margin-bottom: 16px;"><strong class="text-white" style="color: #ffffff;">This wait is a filter.</strong> The initial hype will die. The casuals will quietly lower their standards and disappear.</p>
                        
                        <p style="margin-bottom: 16px;">Your test is the silence between now and then. Act relentlessly when nobody is watching. Act like your future self, <strong class="text-white" style="color: #ffffff; font-weight: bold;">${displayFirstName}</strong>.</p>
                        
                        <p style="margin-bottom: 20px;">When the access key finally hits this inbox, you will realize you were never waiting for a clothing drop. You were simply waiting for the world to align with your actions. You are just collecting your trophy to elevate the work you've already done.</p>
                        
                        <p class="text-white" style="text-align: center; margin-bottom: 10px; color: #ffffff; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">MAINTAIN YOUR FUTURE SELF.</p>
                      </div>
                      
                      <div style="display: inline-block; background-color: #000000; border: 1px solid #333333; padding: 10px 20px; margin-top: 10px;">
                        <p class="text-darker-grey" style="margin: 0; font-size: 10px; letter-spacing: 0.2em; color: #888888; text-transform: uppercase;">
                          IM - EVERYTHING I WANT TO BE.
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Resend error:', error);
    res.status(500).json({ error: error.message || 'Failed to subscribe' });
  }
}
