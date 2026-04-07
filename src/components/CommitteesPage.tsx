import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface Props {
  initialIndex?: number;
  onClose: () => void;
}

export default function CommitteesPage({ initialIndex = 0, onClose }: Props) {
  const content = useContent();
  const committees = content.committees;

  const [active, setActive] = useState(initialIndex);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setActive(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  //  Auto-scroll bottom carousel
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

  const prev = () => setActive((i) => (i - 1 + committees.length) % committees.length);
  const next = () => setActive((i) => (i + 1) % committees.length);

  const current = committees[active];

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-white/60 hover:text-white"
      >
        <X size={24} />
      </button>

      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
        <img
          src="/assets/enactusMSA2.png"
          alt="Enactus MSA"
          className="h-14 md:h-14 w-auto"
        />
      </div>

      {/* Main */}
      <div className="flex-1 relative overflow-hidden">
        <img
          key={active}
          src={current.image}
          alt={current.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-6 md:bottom-12 left-0 right-0 px-4 md:px-20 max-w-4xl">
          
          <p className="text-amber-400 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 md:mb-4">
            {current.tagline}
          </p>

          <h2 className="
            text-2xl 
            sm:text-3xl 
            md:text-5xl 
            lg:text-7xl 
            font-black 
            text-white 
            uppercase 
            tracking-tight 
            mb-3 md:mb-6
            break-words
          ">
            {current.name}
          </h2>

          <p className="
            text-white/70 
            text-sm 
            md:text-base 
            lg:text-lg 
            leading-relaxed 
            max-w-full md:max-w-2xl
          ">
            {current.description}
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={next}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Bottom Carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto border-t border-white/10 bg-black/80 scroll-smooth snap-x snap-mandatory"
      >
        {committees.map((c, i) => (
          <button
            key={c.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            onClick={() => setActive(i)}
            className={`
              snap-center
              relative flex-shrink-0 
              w-28 sm:w-32 md:w-44 
              h-20 sm:h-24 md:h-32 
              overflow-hidden 
              transition-all duration-300 
              ${i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
            `}
          >
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/50 flex items-end p-2">
              <span className="
                text-white 
                text-[9px] sm:text-[10px] md:text-xs 
                font-bold 
                uppercase 
                tracking-wide 
                leading-tight
                break-words
              ">
                {c.name}
              </span>
            </div>

            {i === active && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}