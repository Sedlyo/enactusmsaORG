import { useEffect, useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';
import { TrendingUp, Target } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = progress * (2 - progress);
            setCount(Math.floor(easedProgress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const content = useContent();
  const { stats } = content;
  const { ref, isVisible } = useInView(0.3);

  return (
    <section
      ref={ref}
      className="relative w-full bg-black py-24 overflow-hidden border-t border-white/5"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container-custom section-padding relative z-10">
        <div className="grid gap-12 xl:grid-cols-[1.4fr_1fr] items-center">
          
          {/* Left text block */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="section-eyebrow mb-4">{stats.eyebrow || "What We've Achieved"}</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase leading-tight tracking-tighter">
              {stats.heading || 'Impact In Numbers'}
            </h2>
            <p className="mt-6 max-w-xl text-white/60 text-base sm:text-lg leading-relaxed font-light">
              {stats.description}
            </p>
          </div>

          {/* Right stat cards */}
          <div className="grid gap-6">
            <div className={`group border-l-4 border-amber-400 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:bg-white/[0.06] hover:border-amber-300 hover:shadow-[0_15px_40px_rgba(251,191,36,0.12)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] uppercase font-bold tracking-[0.25em] text-amber-400 flex items-center gap-2">
                  <TrendingUp size={16} /> {stats.stat1Title || 'Years of Experience'}
                </p>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>
              <div className="flex items-end gap-3">
                <span className="text-6xl sm:text-7xl font-black text-white leading-none tracking-tight">
                  <Counter end={stats.stat1Value} />
                </span>
                <span className="text-lg font-bold text-amber-400 uppercase tracking-widest mb-2">
                  {stats.stat1Suffix || 'Years'}
                </span>
              </div>
              <p className="mt-4 text-white/60 text-sm leading-relaxed font-light">
                {stats.stat1Description}
              </p>
            </div>

            <div className={`group border-l-4 border-amber-400/60 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 sm:p-10 transition-all duration-500 delay-150 hover:bg-white/[0.06] hover:border-amber-400 hover:shadow-[0_15px_40px_rgba(251,191,36,0.12)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] uppercase font-bold tracking-[0.25em] text-amber-400 flex items-center gap-2">
                  <Target size={16} /> {stats.stat2Title || 'Projects Completed'}
                </p>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-6xl sm:text-7xl font-black text-amber-400 leading-none tracking-tight">
                  <Counter end={stats.stat2Value} />
                </span>
                <span className="text-lg font-bold text-white/70 uppercase tracking-widest mb-2">
                  {stats.stat2Suffix || 'Initiatives'}
                </span>
              </div>
              <p className="mt-4 text-white/60 text-sm leading-relaxed font-light">
                {stats.stat2Description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

