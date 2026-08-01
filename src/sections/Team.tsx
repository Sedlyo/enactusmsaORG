import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';
import { useSwipe } from '../hooks/use-swipe';

export default function Team() {
  const content = useContent();
  const teamMembers = content.team;
  const { ref, isVisible } = useInView(0.2);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => { setActive(index); setAnimating(false); }, 350);
  }, [animating]);

  useEffect(() => {
    const timer = setInterval(() => goTo((active + 1) % teamMembers.length, 'right'), 4500);
    return () => clearInterval(timer);
  }, [active, teamMembers.length, goTo]);

  const prev = () => goTo((active - 1 + teamMembers.length) % teamMembers.length, 'left');
  const next = () => goTo((active + 1) % teamMembers.length, 'right');

  const swipeHandlers = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  const current = teamMembers[active] ?? teamMembers[0];

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-black py-24 overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-custom section-padding relative z-10">
        <div className="mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="section-eyebrow mb-3">Our Achievers</p>
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter">
              OUR <span className="text-amber-400">TEAM</span>
            </h2>
          </div>
        </div>

        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          {...swipeHandlers}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Member Image Card */}
            <div className="relative aspect-[3/4] max-w-md w-full mx-auto lg:mx-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
              <img
                key={active + '-img'}
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover transition-all duration-500 ease-out"
                style={{
                  opacity: animating ? 0.3 : 1,
                  transform: animating 
                    ? (direction === 'right' ? 'translateX(-20px) scale(0.97)' : 'translateX(20px) scale(0.97)') 
                    : 'translateX(0) scale(1)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white/40 text-xs font-mono tracking-widest uppercase">
                {String(active + 1).padStart(2, '0')} / {String(teamMembers.length).padStart(2, '0')}
              </div>
            </div>

            {/* Member Info */}
            <div 
              className="text-center lg:text-left transition-all duration-300"
              style={{
                opacity: animating ? 0.3 : 1,
                transform: animating 
                  ? (direction === 'right' ? 'translateX(-15px)' : 'translateX(15px)') 
                  : 'translateX(0)'
              }}
            >
              <p className="section-eyebrow mb-3">{current.role}</p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">{current.name}</h3>
              
              {/* Achievement — refined editorial style */}
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-8">
                <div className="w-5 h-0.5 bg-amber-400 rounded-full shrink-0" />
                <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em]">{current.achievement}</span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <button 
                  onClick={prev} 
                  aria-label="Previous team member"
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400 transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={next} 
                  aria-label="Next team member"
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400 transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="flex gap-2 ml-2">
                  {teamMembers.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => goTo(i, i > active ? 'right' : 'left')}
                      aria-label={`Go to team member ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === active ? 'w-7 h-2 bg-amber-400' : 'w-2 h-2 bg-white/15 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Row */}
        <div className="flex gap-3 overflow-x-auto pb-4 pt-2 px-1">
          {teamMembers.map((member, index) => (
            <button 
              key={member.id} 
              onClick={() => goTo(index, index > active ? 'right' : 'left')}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border transition-all duration-300 ${index === active ? 'border-amber-400 opacity-100' : 'border-white/[0.07] opacity-40 hover:opacity-75'}`}
            >
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              {index === active && <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}