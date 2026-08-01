import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useSwipe } from '../hooks/use-swipe';

interface Props {
  initialIndex?: number;
  onClose: () => void;
}

export default function CommitteesPage({ initialIndex = 0, onClose }: Props) {
  const content = useContent();
  const committees = content.committees;

  const [active, setActive] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setActive(initialIndex);
    // Trigger smooth fade/slide-up entrance
    const timer = setTimeout(() => setIsVisible(true), 20);
    return () => clearTimeout(timer);
  }, [initialIndex]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [committees.length]);

  // Auto-scroll bottom carousel
  useEffect(() => {
    const el = itemRefs.current[active];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [active]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 350);
  };

  const prev = () => setActive((i) => (i - 1 + committees.length) % committees.length);
  const next = () => setActive((i) => (i + 1) % committees.length);

  const swipeHandlers = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });
  const current = committees[active] ?? committees[0];

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex flex-col font-urbanist transition-all duration-500 ease-out ${
        isVisible && !isClosing
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-98 pointer-events-none'
      }`}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Close modal"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-amber-400 hover:border-amber-400 hover:scale-110 transition-all duration-300"
      >
        <X size={22} />
      </button>

      {/* Logo watermark */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30">
        <img
          src="/assets/enactusMSA2.png"
          alt="Enactus MSA"
          className="h-10 md:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]"
        />
      </div>

      {/* Main Feature Image & Details */}
      <div className="flex-1 relative overflow-hidden flex items-end" {...swipeHandlers}>
        <img
          key={active}
          src={current.image}
          alt={current.name}
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 pointer-events-none" />

        {/* Content detail overlay */}
        <div className="relative z-10 p-6 md:p-16 max-w-4xl w-full pb-10">
          <p className="text-amber-400 text-xs md:text-sm font-extrabold tracking-[0.3em] uppercase mb-2">
            {current.tagline}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-4 break-words font-urbanist">
            {current.name}
          </h2>

          <p className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 font-sans font-light">
            {current.description}
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous committee"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-amber-400 hover:border-amber-400 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={next}
          aria-label="Next committee"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-amber-400 hover:border-amber-400 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Thumbnails Carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl scroll-smooth snap-x snap-mandatory py-2.5 px-4 gap-3"
      >
        {committees.map((c: any, i: number) => (
          <button
            key={c.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            className={`
              snap-center
              relative flex-shrink-0 
              w-28 sm:w-40 md:w-48 
              h-18 sm:h-24 md:h-28 
              rounded-xl
              overflow-hidden 
              border
              transition-all duration-300 
              ${i === active 
                ? 'border-amber-400 scale-105 opacity-100 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                : 'border-white/10 opacity-40 hover:opacity-80'}
            `}
          >
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-2.5">
              <span className="
                text-white 
                text-[10px] sm:text-xs 
                font-urbanist
                font-extrabold 
                uppercase 
                tracking-wider 
                leading-tight
                break-words
              ">
                {c.name}
              </span>
            </div>

            {i === active && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}