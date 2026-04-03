import { useEffect, useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';

export default function Sponsors() {
  const { content } = useContent();
  const { sponsors } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 overflow-hidden">

      {/* Description */}
<div className="container-custom section-padding mb-16">
  <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4">Partners & Supporters</p>
    <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter mb-6">
      OUR <span className="text-amber-400">SPONSORS</span>
    </h2>
    <p className="text-white/50 text-base sm:text-lg max-w-2xl">{sponsors.description}</p>
  </div>
</div>

    {/* Scrolling title text */}
<div className="flex flex-col items-center gap-2 overflow-hidden mb-16">
  <div className="flex items-center animate-marquee-reverse whitespace-nowrap">
    {[...Array(2)].map((_, i) => (
      <span key={i} className="inline-flex items-center text-3xl sm:text-4xl lg:text-5xl font-black text-white/10 uppercase tracking-tight mr-12">
        <img src="/assets/EnactusLOGO.png" alt="" className="h-8 w-8 object-contain mx-4 inline-block opacity-10" />
        {sponsors.title}
        <img src="/assets/EnactusLOGO.png" alt="" className="h-8 w-8 object-contain mx-4 inline-block opacity-10" />
        {sponsors.title}
        <img src="/assets/EnactusLOGO.png" alt="" className="h-8 w-8 object-contain mx-4 inline-block opacity-10" />
        {sponsors.title}
      </span>
    ))}
  </div>
  <div className="flex items-center animate-marquee whitespace-nowrap">
    {[...Array(2)].map((_, i) => (
      <span key={i} className="inline-flex items-center text-3xl sm:text-4xl lg:text-5xl font-black text-white/5 uppercase tracking-tight mr-12">
        <img src="/assets/EnactusLOGO.png" alt="" className="h-8 w-8 object-contain mx-4 inline-block opacity-5" />
        {sponsors.title}
        <img src="/assets/EnactusLOGO.png" alt="" className="h-8 w-8 object-contain mx-4 inline-block opacity-5" />
        {sponsors.title}
        <img src="/assets/EnactusLOGO.png" alt="" className="h-8 w-8 object-contain mx-4 inline-block opacity-5" />
        {sponsors.title}
      </span>
    ))}
  </div>
  <div className="flex items-center animate-marquee whitespace-nowrap">
    {[...Array(2)].map((_, i) => (
      <span key={i} className="inline-flex items-center text-4xl sm:text-5xl lg:text-7xl font-black text-white/20 uppercase tracking-tight mr-12">
        <img src="/assets/EnactusLOGO.png" alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain mx-4 sm:mx-6 inline-block opacity-20" />
        {sponsors.title}
        <img src="/assets/EnactusLOGO.png" alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain mx-4 sm:mx-6 inline-block opacity-20" />
        {sponsors.title}
        <img src="/assets/EnactusLOGO.png" alt="" className="h-10 w-10 sm:h-12 sm:w-12 object-contain mx-4 sm:mx-6 inline-block opacity-20" />
        {sponsors.title}
      </span>
    ))}
  </div>
</div>

      {/* Sponsor logos */}
      {sponsors.logos.length > 0 && (
        <div className={`container-custom section-padding transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-6 border border-white/10 rounded-2xl hover:border-amber-400/30 transition-all duration-300 group"
                style={{ width: 'clamp(140px, 22%, 200px)' }}
              >
                <img
                  src={logo}
                  alt={`Sponsor ${i + 1}`}
                  className="h-20 w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}