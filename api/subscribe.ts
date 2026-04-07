import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
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
          audienceId: audienceId,
        });
      } catch (contactError) {
        console.error('Failed to add contact to audience:', contactError);
      }
    }

    const logoWhiteUrl = 'https://raw.githubusercontent.com/HelloKittyMahmutt/IM-store/main/public/logo-white.png';

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
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; background-image: linear-gradient(#000000, #000000);">
          <div class="email-container" style="background-color: #000000; background-image: linear-gradient(#000000, #000000); color: #ffffff; -webkit-text-fill-color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 80px 20px; text-align: center;">
            
            <img src="${logoWhiteUrl}" alt="IM Logo" width="300" style="display: block; margin: 0 auto 40px auto; max-width: 100%; height: auto; background-color: #000000; background-image: linear-gradient(#000000, #000000);" />

            <div class="divider" style="width: 40px; height: 2px; background-color: #ffffff; background-image: linear-gradient(#ffffff, #ffffff); margin: 0 auto 40px auto;"></div>
            <h2 class="text-main" style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 20px; color: #ffffff; -webkit-text-fill-color: #ffffff;">You are on the list.</h2>
            <p class="text-muted" style="font-size: 14px; line-height: 1.8; max-width: 400px; margin: 0 auto 50px auto; letter-spacing: 0.05em; color: #aaaaaa; -webkit-text-fill-color: #aaaaaa;">
              You have secured your place. When the time comes, you will be the first to know.
            </p>
            <div class="box" style="display: inline-block; border: 1px solid #333333; padding: 15px 30px; font-family: monospace; letter-spacing: 0.3em; font-size: 11px; text-transform: uppercase; color: #888888; -webkit-text-fill-color: #888888;">
              Drop: 10 . 31 . 26
            </div>
          </div>
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
