import { useEffect, useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import CommitteesPage from '../components/CommitteesPage';
import TransitionOverlay from '../components/TransitionOverlay';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  const { committees } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [committeeIndex, setCommitteeIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openCommittee = (index: number) => {
    if (transitioning) return;
    setCommitteeIndex(index);
    setTransitioning(true);
    setTimeout(() => setCommitteeOpen(true), 400);
    setTimeout(() => setTransitioning(false), 850);
  };

  const closeCommittee = () => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => setCommitteeOpen(false), 400);
    setTimeout(() => setTransitioning(false), 850);
  };

  return (
    <>
      <TransitionOverlay active={transitioning} />

      {committeeOpen && <CommitteesPage initialIndex={committeeIndex} onClose={closeCommittee} />}

      <section ref={sectionRef} className="relative w-full bg-black overflow-hidden border-t border-white/5">

        {/* Header */}
        <div className="container-custom section-padding pt-24 pb-12">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <p className="section-eyebrow mb-3">What We Do</p>
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter">
                Commi<span className="text-amber-400">ttees</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm sm:text-base max-w-xs leading-relaxed">
              Each committee drives a unique pillar of our organization — click to explore.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="container-custom section-padding">
          <div className={`h-px bg-gradient-to-r from-amber-400/40 via-white/10 to-transparent transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Committee list */}
        <div className="container-custom section-padding pb-24">
          <div className={`flex flex-col mt-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {committees.map((committee: any, index: number) => (
              <button
                key={committee.name}
                onClick={() => openCommittee(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex items-center justify-between py-6 px-4 border-b border-white/[0.07] text-left transition-all duration-300 hover:px-6 rounded-xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.6s ease ${index * 50}ms, padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
                  background: hoveredIndex === index ? 'rgba(251,191,36,0.05)' : 'transparent',
                }}
              >
                {/* Index + Name */}
                <div className="flex items-center gap-5 sm:gap-8">
                  <span className={`text-xs font-mono w-6 shrink-0 transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-amber-400' : 'text-white/20'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-amber-400' : 'text-white'
                  }`}>
                    {committee.name}
                  </span>
                </div>

                {/* Tagline + Arrow */}
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="hidden sm:block text-white/30 text-xs font-medium uppercase tracking-widest">
                    {committee.tagline}
                  </span>
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'border-amber-400 bg-amber-400 text-black scale-110'
                      : 'border-white/15 text-white/30'
                  }`}>
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}