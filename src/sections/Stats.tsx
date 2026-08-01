import { useEffect, useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
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
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom section-padding relative z-10">
        <div className="grid gap-12 xl:grid-cols-[1.4fr_1fr] items-center">
          
          {/* Left text block */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="section-eyebrow mb-4">What We've Achieved</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase leading-tight tracking-tighter">
              Impact <span className="text-amber-400">In Numbers</span>
            </h2>
            <p className="mt-6 max-w-xl text-white/55 text-base sm:text-lg leading-relaxed">
              Enactus MSA combines ambitious ideas with structured teamwork to deliver meaningful projects, leadership experience, and long-term community results.
            </p>
          </div>

          {/* Right stat cards — consistent visual language */}
          <div className="grid gap-4">
            <div className={`border-l-2 border-amber-400 bg-white/[0.02] rounded-2xl p-8 sm:p-10 transition-all duration-1000 hover:bg-white/[0.04] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-[11px] uppercase font-bold tracking-[0.25em] text-white/40 mb-4">Years of Experience</p>
              <div className="flex items-end gap-3">
                <span className="text-6xl sm:text-7xl font-black text-white leading-none">
                  <Counter end={stats.yearsOfExperience} />
                </span>
                <span className="text-base font-bold text-amber-400 uppercase tracking-widest mb-2">yrs</span>
              </div>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">
                Equipping students with hands-on leadership, professional development, and real project management.
              </p>
            </div>

            <div className={`border-l-2 border-amber-400/50 bg-white/[0.02] rounded-2xl p-8 sm:p-10 transition-all duration-1000 delay-150 hover:bg-white/[0.04] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-[11px] uppercase font-bold tracking-[0.25em] text-white/40 mb-4">Projects Completed</p>
              <div className="flex items-end gap-3">
                <span className="text-6xl sm:text-7xl font-black text-amber-400 leading-none">
                  <Counter end={stats.projectsCompleted} />
                </span>
                <span className="text-base font-bold text-white/50 uppercase tracking-widest mb-2">initiatives</span>
              </div>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">
                Well-structured projects that build community value, social innovation, and stakeholder trust.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
