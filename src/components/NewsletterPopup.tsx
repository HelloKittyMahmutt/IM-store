import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    
    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Small delay for the fade-in effect to trigger after display:block
        setTimeout(() => setIsVisible(true), 50);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    setIsSubmitted(true);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');

    setTimeout(() => {
      handleClose();
    }, 2500);
  } catch (error) {
    console.error('Subscribe error:', error);
    alert('Something went wrong. Please try again.');
  }
};

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className={`relative w-full max-w-lg bg-white p-8 md:p-12 shadow-2xl transition-all duration-300 transform ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
          aria-label="Close popup"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-4">
            The Drop Is Coming
          </h2>
          
          {!isSubmitted ? (
            <>
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                Sign up to our newsletter to be the first to know when we go live. Exclusive access for early members.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  required
                  className="w-full px-4 py-4 bg-gray-100 border border-transparent focus:border-black focus:bg-white outline-none transition-all text-sm tracking-widest uppercase placeholder:text-gray-400 text-black text-center"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  Notify Me
                </button>
              </form>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-6">
                By signing up, you agree to our Terms & Privacy Policy.
              </p>
            </>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">You're on the list</h3>
              <p className="text-sm text-gray-600">Keep an eye on your inbox.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
