import React, { useEffect } from 'react';

export const Returns: React.FC = () => {
  useEffect(() => {
    // Scroll handled by PageTransition
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-40 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">
          Returns & Exchanges
        </h1>
        
        <div className="space-y-12 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">Our Policy</h2>
            <p>
              We accept returns within 14 days of delivery for a full refund or exchange. Items must be unworn, unwashed, and in their original condition with all tags attached.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">How to Return</h2>
            <p className="mb-4">
              To initiate a return, please contact our support team at <a href="mailto:contact@yourbrand.com" className="text-black font-bold hover:underline">contact@yourbrand.com</a> with your order number.
            </p>
            <p>
              We will provide you with a return shipping label and instructions on how to send your package back to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">Refunds</h2>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
