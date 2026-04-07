import Stripe from 'stripe';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, currency = 'eur', rate = 1, origin: clientOrigin } = req.body;
    
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return res.status(500).json({ error: 'Stripe is not configured on the server. Missing STRIPE_SECRET_KEY.' });
    }

    const stripe = new Stripe(key, { apiVersion: '2023-10-16' as any });
    
    const origin = clientOrigin || process.env.APP_URL || 'http://localhost:3000';

    const lineItems = items.map((item: any) => {
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

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
