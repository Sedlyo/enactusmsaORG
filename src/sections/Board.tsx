import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const boardImages = [
  '/assets/placeholder.png',
  '/assets/placeholder.png',
  '/assets/placeholder.png',
];

export default function Board() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto slider
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      goTo((activeImage + 1) % boardImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isVisible, activeImage]);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActiveImage(index); setAnimating(false); }, 300);
  };

  const prev = () => goTo((activeImage - 1 + boardImages.length) % boardImages.length);
  const next = () => goTo((activeImage + 1) % boardImages.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-black py-20 overflow-hidden">
      <div className="container-custom section-padding">

       {/* Heading */}
<div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
  <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter text-center">
    OUR <span className="text-amber-400">BOARD</span>
  </h2>
        </div>

        {/* Slider */}
        <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div
            className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={activeImage}
              src={boardImages[activeImage]}
              alt={`Enactus MSA Board ${activeImage + 1}`}
              className="w-full h-full object-cover"
              style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.3s ease' }}
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl" />

            {/* Prev button */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 right-4 text-white/50 text-xs tracking-widest">
              {String(activeImage + 1).padStart(2, '0')} / {String(boardImages.length).padStart(2, '0')}
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {boardImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeImage ? 'w-6 h-2 bg-amber-400' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-24 sm:h-24 border-l-2 border-t-2 border-white/20" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 border-r-2 border-b-2 border-white/20" />
        </div>

        {/* Description */}
        <div className={`mt-12 text-center max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Our dedicated board members lead the team with passion and vision,
            driving impactful projects and fostering a culture of innovation and social responsibility.
          </p>
        </div>
      </div>

      <div className="absolute top-1/4 left-10 w-40 h-40 border border-white/5 rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-60 h-60 border border-white/5 rounded-full" />
    </section>
  );
}