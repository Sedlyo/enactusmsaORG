import { useCallback, useEffect, useState } from 'react';
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
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
    setTimeout(() => { setActive(index); setAnimating(false); }, 400);
  }, [animating]);

  useEffect(() => {
    const timer = setInterval(() => goTo((active + 1) % teamMembers.length, 'right'), 4000);
    return () => clearInterval(timer);
  }, [active, teamMembers.length, goTo]);

  const prev = () => goTo((active - 1 + teamMembers.length) % teamMembers.length, 'left');
  const next = () => goTo((active + 1) % teamMembers.length, 'right');

  const swipeHandlers = useSwipe({ onSwipeLeft: next, onSwipeRight: prev });

  const current = teamMembers[active] ?? teamMembers[0];
  const slideOut = direction === 'right' ? '-translate-x-16' : 'translate-x-16';

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-black py-20 overflow-hidden">
      <div className="container-custom section-padding">
        <div className="mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter">
              OUR <span className="text-amber-400">TEAM</span>
            </h2>
          </div>
        </div>

        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          {...swipeHandlers}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl">
              <img
                key={active + '-img'}
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover"
                style={{ opacity: animating ? 0 : 1, transform: animating ? slideOut : 'translateX(0)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />
              <div className="absolute bottom-4 left-4 text-white/50 text-xs tracking-widest uppercase">
                {String(active + 1).padStart(2, '0')} / {String(teamMembers.length).padStart(2, '0')}
              </div>
            </div>

            <div style={{ opacity: animating ? 0 : 1, transform: animating ? slideOut : 'translateX(0)', transition: 'opacity 0.4s ease, transform 0.4s ease' }} className="text-center lg:text-left">
              <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">{current.role}</p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8">{current.name}</h3>
              <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full mb-10">
                <Trophy className="text-amber-400" size={20} />
                <span className="text-white/80 uppercase tracking-wider text-sm">{current.achievement}</span>
              </div>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-amber-400 transition-all duration-300">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-amber-400 transition-all duration-300">
                  <ChevronRight size={20} />
                </button>
                <div className="flex gap-2 ml-2">
                  {teamMembers.map((_, i) => (
                    <button key={i} onClick={() => goTo(i, i > active ? 'right' : 'left')}
                      className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-amber-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {teamMembers.map((member, index) => (
            <button key={member.id} onClick={() => goTo(index, index > active ? 'right' : 'left')}
              className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border transition-all duration-300 ${index === active ? 'border-amber-400 scale-105' : 'border-white/10 opacity-50 hover:opacity-80'}`}
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
