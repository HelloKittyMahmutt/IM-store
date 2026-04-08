import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Force show popup for testing
    const hasSeenPopup = false; // localStorage.getItem('hasSeenNewsletterPopup');
    
    if (!hasSeenPopup) {
      // Show popup after 1 second for testing
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Small delay for the fade-in effect to trigger after display:block
        setTimeout(() => setIsVisible(true), 50);
      }, 1000);
      
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
    if (!email || !firstName) return;

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
    
    setIsSubmitted(true);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
    
    // Close automatically after 2.5 seconds
    setTimeout(() => {
      handleClose();
    }, 2500);
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
          <h2 className="text-4xl md:text-5xl font-serif italic text-black mb-4">
            The Drop Is Coming
          </h2>
          
          {!isSubmitted ? (
            <>
              <p className="text-xs md:text-sm font-mono text-gray-500 mb-8 leading-relaxed uppercase tracking-widest">
                Only access for the key that unlocks the drop.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="FIRST NAME"
                  required
                  className="w-full px-4 py-4 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-all text-sm font-mono tracking-widest uppercase placeholder:text-gray-400 text-black text-center"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  required
                  className="w-full px-4 py-4 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-all text-sm font-mono tracking-widest uppercase placeholder:text-gray-400 text-black text-center"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 mt-4 text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  Notify Me
                </button>
              </form>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-8">
                By signing up, you agree to our Terms & Privacy Policy.
              </p>
            </>
          ) : (
            <div className="py-12">
              <p className="text-sm font-mono text-black uppercase tracking-widest">
                You are on the list.
              </p>
              <p className="text-xs font-mono text-gray-500 mt-4 uppercase tracking-widest">
                Keep an eye on your inbox.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
