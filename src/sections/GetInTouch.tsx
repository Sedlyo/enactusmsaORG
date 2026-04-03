import { useEffect, useRef, useState } from 'react';

export default function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-20 overflow-hidden">
      <div className="container-custom section-padding">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4">
            Want to join us?
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter">
            Get In <span className="text-amber-400">Touch</span>
          </h2>
        </div>
      </div>
    </section>
  );
}