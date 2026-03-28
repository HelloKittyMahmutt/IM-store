import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PaymentOptionsProps {
  amount: number;
  items: any[];
  onSuccess: () => void;
  onCancel: () => void;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({ amount, items, onSuccess, onCancel }) => {
  const [activeMethod, setActiveMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'STRIPE_SUCCESS') {
        onSuccess();
      } else if (event.data?.type === 'STRIPE_CANCEL') {
        setIsProcessing(false);
        onCancel();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess, onCancel]);

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    
    // Open the popup immediately to avoid browser popup blockers (which block async popups)
    const authWindow = window.open('', 'stripe_checkout', 'width=600,height=700');
    if (authWindow) {
      authWindow.document.write('<div style="font-family: sans-serif; padding: 20px; text-align: center;">Loading secure checkout...</div>');
    } else {
      alert('Please allow popups for this site to complete your payment.');
      setIsProcessing(false);
      return;
    }

    try {
      // Backend is needed to create a Stripe Checkout Session securely
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items, 
          currency: 'eur',
          origin: window.location.origin
        }),
      });
      const data = await res.json();
      
      if (data.url) {
        // Redirect the popup to the Stripe Checkout URL
        authWindow.location.href = data.url;
        setIsProcessing(false);
      } else {
        authWindow.close();
        alert(data.error || 'Failed to create checkout session. Ensure STRIPE_SECRET_KEY is set on the server.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      authWindow.close();
      alert('Network error. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-xl font-black uppercase tracking-tight">Payment Method</h3>
      
      <div className="flex gap-4 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveMethod('card')}
          className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${
            activeMethod === 'card' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
          }`}
        >
          Card
        </button>
        <button
          onClick={() => setActiveMethod('paypal')}
          className={`text-sm font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${
            activeMethod === 'paypal' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
          }`}
        >
          PayPal
        </button>
      </div>

      <div className="min-h-[200px]">
        {activeMethod === 'card' && (
          <div>
            {!stripeKey ? (
              <div className="p-4 bg-gray-50 text-sm font-mono text-gray-600">
                <p className="font-bold text-black mb-2">Developer Note:</p>
                <p>Stripe is not configured. Please add VITE_STRIPE_PUBLISHABLE_KEY to your frontend environment and STRIPE_SECRET_KEY to your backend environment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">You will be redirected to Stripe's secure checkout page to complete your payment.</p>
                <button
                  onClick={handleStripeCheckout}
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Redirecting...' : 'Pay with Card'}
                </button>
              </div>
            )}
          </div>
        )}

        {activeMethod === 'paypal' && (
          <div>
            {!paypalClientId ? (
              <div className="p-4 bg-gray-50 text-sm font-mono text-gray-600">
                <p className="font-bold text-black mb-2">Developer Note:</p>
                <p>PayPal is not configured. Please add VITE_PAYPAL_CLIENT_ID to your environment.</p>
              </div>
            ) : (
              <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'EUR' }}>
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'black', shape: 'rect' }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: 'CAPTURE',
                      purchase_units: [
                        {
                          amount: {
                            currency_code: 'EUR',
                            value: amount.toString(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then(() => {
                      onSuccess();
                    });
                  }}
                  onCancel={() => {
                    onCancel();
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
