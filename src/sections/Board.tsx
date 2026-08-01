import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';
import { useSwipe } from '../hooks/use-swipe';

export default function Board() {
  const content = useContent();
  const boardImages = content.board.images;
  const { ref, isVisible } = useInView(0.2);
  const [activeImage, setActiveImage] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActiveImage(index); setAnimating(false); }, 350);
  }, [animating]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      goTo((activeImage + 1) % boardImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isVisible, activeImage, boardImages.length, goTo]);

  const prev = () => goTo((activeImage - 1 + boardImages.length) % boardImages.length);
  const next = () => goTo((activeImage + 1) % boardImages.length);

  const swipeHandlers = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-black py-24 overflow-hidden border-t border-white/5">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-custom section-padding relative z-10">
        {/* Heading */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-3 text-center">Leadership</p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter text-center">
            OUR <span className="text-amber-400">BOARD</span>
          </h2>
        </div>

        {/* Slider */}
        <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div
            className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
            {...swipeHandlers}
          >
            <img
              key={activeImage}
              src={boardImages[activeImage]}
              alt={`Enactus MSA Board ${activeImage + 1}`}
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: animating ? 0.2 : 1,
                transform: animating ? 'scale(1.04)' : 'scale(1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <button
              onClick={prev}
              aria-label="Previous board image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next board image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white/70 text-xs font-mono tracking-widest">
              {String(activeImage + 1).padStart(2, '0')} / {String(boardImages.length).padStart(2, '0')}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              {boardImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === activeImage ? 'w-8 h-2.5 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-3 -left-3 w-16 h-16 sm:w-20 sm:h-20 border-l-2 border-t-2 border-amber-400/40 rounded-tl-2xl pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 sm:w-20 sm:h-20 border-r-2 border-b-2 border-amber-400/40 rounded-br-2xl pointer-events-none" />
        </div>

        {/* Description */}
        <div className={`mt-12 text-center max-w-2xl mx-auto transition-all duration-500 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          } ${isVisible ? '' : 'opacity-0'}`}>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            {content.board.description}
          </p>
        </div>
      </div>
    </section>
  );
}
