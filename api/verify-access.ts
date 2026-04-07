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
    const audienceId = process.env.VITE_RESEND_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID;
    
    if (!audienceId) {
      return res.status(500).json({ error: 'Audience ID not configured' });
    }

    const response = await resend.contacts.list({ audienceId });
    
    const contactsList = response.data?.data || response.data || [];
    const contacts = Array.isArray(contactsList) ? contactsList : [];
    
    const isSubscribed = contacts.some((c: any) => c.email.toLowerCase() === email.toLowerCase());

    if (isSubscribed) {
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ error: 'Email not found on the waitlist.' });
    }
  } catch (error: any) {
    console.error('Verify access error:', error);
    res.status(500).json({ error: 'Failed to verify access' });
  }
}
