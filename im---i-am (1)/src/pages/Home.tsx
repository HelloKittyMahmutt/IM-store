import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data/products';

export const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main id="top">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop" alt="Mountain Landscape" className="w-full h-full object-cover filter grayscale brightness-50 contrast-125 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight uppercase leading-[0.9] mb-6 text-white">
              I’m Everything<br /> I Want To Be.
            </h1>
          </div>
          
          <div>
            <p className="text-sm md:text-lg font-mono text-[#888888] tracking-widest uppercase mb-12 max-w-xl mx-auto">
              You’re not becoming. You’re maintaining who you already are.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/#collection" className="px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors min-w-[200px] cursor-pointer inline-flex items-center justify-center">
              Shop The Collection
            </Link>
            <Link to="/#mindset" className="px-8 py-4 bg-transparent border border-white text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors min-w-[200px] cursor-pointer inline-flex items-center justify-center">
              Discover Mindset
            </Link>
          </div>
        </div>

        <Link to="/#mindset" className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer text-white" aria-label="Scroll down">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </Link>
      </section>

      {/* Mindset Section */}
      <section id="mindset" className="py-32 md:py-48 px-6 bg-[#050505] border-t border-white/5 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 md:order-1 relative">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-[#333333] relative">
                  <img src="/mindset.png" alt="Mountain Peak" className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-none text-white">
                  This Is Not <br/>
                  <span className="text-[#888888]/50">Motivation.</span>
                </h2>
              </div>

              <div>
                <div className="space-y-8 text-base md:text-xl font-sans text-[#f5f5f5]/80 leading-relaxed">
                  <p>
                    <strong className="block text-2xl md:text-3xl text-white font-bold tracking-tight mb-2">Live as the person you want to be now.</strong>
                    We do not chase the future. We embody it in the present.
                  </p>
                  <p>
                    Discipline is simply the bridge while the world aligns to your reality. 
                    Most people quit before life adjusts. They wait for permission.
                  </p>
                  <p>
                    <span className="text-sm font-bold tracking-widest text-[#888888] uppercase block mt-6 border-l-2 border-white pl-4">
                      IM exists to shift perspective.
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-32 bg-[#050505] relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div>
            <h2 className="text-center text-xs font-mono tracking-[0.3em] uppercase mb-20 text-[#888888]">
              Origin Story — The Awakening
            </h2>
          </div>

          <div className="space-y-16">
            <div className="flex justify-start"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-white">It started in a small town in Bulgaria. 5,000 people. No expectations.</h3></div>
            <div className="flex justify-end"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-right text-white">Poverty wasn’t just a condition it was a belief passed down quietly.</h3></div>
            <div className="flex justify-start"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-white">But one boy saw something different in himself long before the world did. Not confidence. Clarity.</h3></div>
            <div className="flex justify-end"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-right text-white">He didn’t escape through alcohol, gambling, or excuses. He stayed neutral. Focused.</h3></div>
            <div className="flex justify-start"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-white">While working abroad, alone in a one-room apartment, he designed a logo and made a promise:</h3></div>
            <div className="flex justify-end"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-right text-white">One day this won’t just be a symbol it will change how people see themselves.</h3></div>
            <div className="flex justify-start"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-white">He learned early that labor alone wouldn’t buy freedom. So he studied money. Skills. Himself.</h3></div>
            <div className="flex justify-end"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-right text-white">Then came the moment that changed everything, a crash.</h3></div>
            <div className="flex justify-start"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-white">Instead of breaking, he aligned. He disappeared into discipline.</h3></div>
            <div className="flex justify-end"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-right text-white">Training. Nutrition. Learning. Growth. No parties. No noise. No waiting.</h3></div>
            <div className="flex justify-start"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-white">If you act as the person you want to become, you already are that person.</h3></div>
            <div className="flex justify-end"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-right text-white">Leaving comfort behind, he stepped into new environments, new standards, new people.</h3></div>
            <div className="flex justify-start"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-white">The body followed. The opportunities followed. The world followed.</h3></div>
            <div className="flex justify-end"><h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-tight max-w-3xl hover:text-[#888888] transition-colors cursor-default text-right text-white">I M was born from this truth: You don’t become someone when life gives you permission.</h3></div>
          </div>

          <div className="mt-32 text-center border-t border-white/10 pt-16">
            <p className="text-sm md:text-base font-mono uppercase tracking-widest text-[#888888]">
              "I AM a lifestyle. Not a label."
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="collection" className="py-32 bg-white text-black scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex justify-between items-end mb-24">
            <div>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black">
                Essential<br/>Gear
              </h2>
            </div>
            <div className="hidden md:block">
              <p className="text-right max-w-xs text-sm font-bold tracking-wide uppercase border-l-2 border-black pl-4 text-black">
                This isn’t something you wear to feel motivated. <br/>
                It represents who you already are.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl mx-auto">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer block">
                <div className="relative overflow-hidden aspect-[3/4] mb-6">
                  {/* Front Image */}
                  <img src={product.images[0]} alt={product.name} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out grayscale ${product.images.length > 1 ? 'group-hover:opacity-0' : ''}`} />
                  {/* Back Image (On Hover) */}
                  {product.images.length > 1 && (
                    <img src={product.images[1]} alt={`${product.name} back`} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100 grayscale`} />
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm z-10">
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center justify-between text-black">
                      View Details 
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start border-t border-black pt-4">
                  <h3 className="text-lg font-black uppercase tracking-tight text-black">{product.name}</h3>
                  <span className="text-sm font-mono text-black">€{product.price}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-24 text-center border-t border-gray-200 pt-16">
            <p className="text-sm font-mono uppercase text-gray-500">
              Limited Drops. No Restocks.
            </p>
          </div>

        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-32 md:py-48 bg-[#050505] border-y border-white/10 flex items-center justify-center relative scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-[#888888] uppercase block mb-16">
              Discipline With Perspective
            </span>
          </div>

          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-20 leading-[0.9] text-white">
              You Already<br /> Have What<br /> You Need.
            </h2>
          </div>

          <div className="space-y-16 text-xs md:text-sm font-mono uppercase tracking-widest text-[#f5f5f5]/80 leading-loose">
            
            <div>
              <p className="font-sans normal-case tracking-normal text-base md:text-lg">
                IM donates <strong className="text-white border-b border-white pb-0.5">10% of profits</strong> to disabled children.
              </p>
            </div>

            <div>
              <p className="uppercase tracking-widest text-sm font-bold text-[#888888]">
                Not from sympathy.<br/>
                From perspective.
              </p>
            </div>

            <div>
              <div className="flex flex-col items-center gap-3 text-center max-w-4xl mx-auto">
                <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#888888] uppercase">
                  There are children who would give everything.
                </p>
                <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#888888] uppercase">
                  For the ability you woke up with
                </p>
                <p className="text-xl md:text-3xl font-black tracking-widest text-white uppercase my-2">
                  This Morning.
                </p>
              </div>
            </div>

            <div className="py-12">
              <div className="flex flex-col items-start gap-4 md:gap-6 select-none transform -rotate-1 font-sans">
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-[#f5f5f5]/30 hover:text-white transition-all duration-500 cursor-default">
                  To Stand.
                </h3>
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-[#f5f5f5]/50 hover:text-white transition-all duration-500 cursor-default ml-4 md:ml-16">
                  To Walk.
                </h3>
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-[#f5f5f5]/70 hover:text-white transition-all duration-500 cursor-default ml-8 md:ml-32">
                  To Run.
                </h3>
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-white ml-12 md:ml-48 hover:scale-105 transition-transform duration-300 origin-left relative">
                  To Train<span className="text-[#888888]">.</span>
                </h3>
              </div>
            </div>

            <div>
              <p className="italic text-[#888888] text-lg max-w-lg mx-auto border-l border-white/20 pl-6">
                Millions of capable people waste what others pray for.
              </p>
            </div>
            
            <div className="space-y-4 pt-4">
              <p className="font-bold text-white uppercase tracking-wide text-lg">If you can move, you can build.</p>
              <p className="font-bold text-white uppercase tracking-wide text-lg">If you can build, you have responsibility.</p>
            </div>

            <div className="pt-16">
              <p className="text-xs font-mono tracking-widest uppercase text-[#888888] mb-8">
                IM exists to remind you:
              </p>
              <div className="space-y-2">
                <p className="text-3xl md:text-5xl font-black uppercase text-white">
                  You are already equipped.
                </p>
                <p className="text-2xl md:text-4xl font-thin text-[#888888]">
                  Some aren’t.
                </p>
              </div>
            </div>

            <div className="pt-20">
              <div className="w-px h-16 bg-white/20 mx-auto mb-8"></div>
              <p className="text-xl md:text-3xl font-black uppercase tracking-widest text-white leading-tight">
                So We Build.<br/>
                And We Give Back.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};
