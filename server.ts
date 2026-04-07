import express from 'express';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import { Resend } from 'resend';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize Resend lazily
let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

// Initialize Stripe lazily
let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key, { apiVersion: '2023-10-16' as any });
  }
  return stripeClient;
}

// API Routes
app.post('/api/verify-access', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const resend = getResend();
    const audienceId = process.env.VITE_RESEND_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID;
    
    if (!audienceId) {
      // If no audience ID is configured, we can't verify. Just allow for testing or deny.
      return res.status(500).json({ error: 'Audience ID not configured' });
    }

    // List contacts from Resend
    const response = await resend.contacts.list({ audienceId });
    
    // Resend SDK returns data.data as the array of contacts
    const contactsList = response.data?.data || response.data || [];
    const contacts = Array.isArray(contactsList) ? contactsList : [];
    
    const isSubscribed = contacts.some((c: any) => c.email.toLowerCase() === email.toLowerCase());

    if (isSubscribed) {
      res.json({ success: true });
    } else {
      res.status(403).json({ error: 'Email not found on the waitlist.' });
    }
  } catch (error: any) {
    console.error('Verify access error:', error);
    res.status(500).json({ error: 'Failed to verify access' });
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const resend = getResend();
    
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
        // Continue to send the welcome email even if adding to audience fails
      }
    }

    // Use public GitHub URLs because email clients (Gmail/Apple Mail) route images through proxies
    // that cannot access protected local dev environments.
    const logoBlackUrl = 'https://raw.githubusercontent.com/HelloKittyMahmutt/IM-store/main/public/logo.png';
    const logoWhiteUrl = 'https://raw.githubusercontent.com/HelloKittyMahmutt/IM-store/main/public/logo-white.png';

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

    res.json({ success: true });
  } catch (error: any) {
    console.error('Resend error:', error);
    res.status(500).json({ error: error.message || 'Failed to subscribe' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, currency = 'eur', rate = 1, origin: clientOrigin } = req.body;
    
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: 'Stripe is not configured on the server. Missing STRIPE_SECRET_KEY.' });
    }

    const stripe = getStripe();
    
    // Use client origin, fallback to APP_URL, fallback to localhost
    // This ensures Stripe always gets a valid absolute URL regardless of the proxy environment
    const origin = clientOrigin || process.env.APP_URL || 'http://localhost:3000';

    const lineItems = items.map((item: any) => {
      // Stripe requires absolute URLs for images
      const imageUrl = item.product.images?.length ? item.product.images[0] : null;
      const absoluteImageUrl = imageUrl 
        ? (imageUrl.startsWith('http') ? imageUrl : `${origin}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`)
        : null;

      return {
        price_data: {
          currency,
          product_data: {
            name: item.product.name,
            description: `Size: ${item.size}`,
            images: absoluteImageUrl ? [absoluteImageUrl] : [],
          },
          unit_amount: Math.round(item.product.price * rate * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/checkout?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
