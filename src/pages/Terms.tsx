import React, { useEffect } from 'react';

export const Terms: React.FC = () => {
  useEffect(() => {
    // Scroll handled by PageTransition
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-40 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16">
          Terms of Service
        </h1>
        
        <div className="space-y-12 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">1. Overview</h2>
            <p>
              This website is operated by IM Brand. Throughout the site, the terms "we", "us" and "our" refer to IM Brand. We offer this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">2. Online Store Terms</h2>
            <p>
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">3. Products or Services</h2>
            <p>
              Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">4. Modifications to the Service and Prices</h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
