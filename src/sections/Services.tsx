import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';
import CommitteesPage from './CommitteesPage';
import TransitionOverlay from '../components/TransitionOverlay';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  const { content } = useContent();
  const { committees } = content;
  const { ref, isVisible } = useInView(0.1);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [committeeIndex, setCommitteeIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openCommittee = (index: number) => {
    setCommitteeIndex(index);
    setTransitioning(true);
    setTimeout(() => setCommitteeOpen(true), 400);
    setTimeout(() => setTransitioning(false), 900);
  };

  const closeCommittee = () => {
    setTransitioning(true);
    setTimeout(() => setCommitteeOpen(false), 400);
    setTimeout(() => setTransitioning(false), 900);
  };

  return (
    <>
      <TransitionOverlay active={transitioning} />

      {committeeOpen && <CommitteesPage initialIndex={committeeIndex} onClose={closeCommittee} />}

      <section ref={ref} className="relative w-full bg-black overflow-hidden">
        {/* Header */}
        <div className="container-custom section-padding pt-20 pb-12">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">What we do</p>
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
          <div className={`h-px bg-white/10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Committee list */}
        <div className="container-custom section-padding pb-20">
          <div className={`flex flex-col transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {committees.map((committee, index) => (
              <button
                key={committee.name}
                onClick={() => openCommittee(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex items-center justify-between py-5 sm:py-6 border-b border-white/10 text-left transition-all duration-300 ${
                  hoveredIndex === index ? 'px-4 bg-white/[0.03]' : 'px-0'
                }`}
                style={{
                  transitionDelay: `${index * 40}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${index * 40}ms, transform 0.6s ease ${index * 40}ms, padding 0.3s ease, background 0.3s ease`,
                }}
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="text-white/20 text-xs font-mono w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-amber-400' : 'text-white'
                  }`}>
                    {committee.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="hidden sm:block text-white/30 text-xs uppercase tracking-widest">
                    {committee.tagline}
                  </span>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'border-amber-400 bg-amber-400 text-black'
                      : 'border-white/20 text-white/40'
                  }`}>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom marquee */}
        <div className="border-t border-white/5 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[5vw] font-black text-white/[0.04] uppercase tracking-tight mx-8">
                MARKETING — ORGANIZING — DESIGN — PHOTOGRAPHY — BRAND —
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
