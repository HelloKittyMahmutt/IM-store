import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.message || 'Failed to save contact' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('RESEND CONTACT ERROR:', error);
    return res.status(500).json({ error: 'Failed to save email' });
  }
}
