import express from 'express';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, currency = 'eur', origin: clientOrigin } = req.body;
    
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
          unit_amount: Math.round(item.product.price * 100),
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
