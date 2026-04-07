import { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';

export default function About() {
  const content = useContent();
  const { about } = content;
  const { ref, isVisible } = useInView(0.2);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!isVisible) return;
    setDisplayed('');
    let i = 0;
    const fullText = about.heading;
    const timer = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [isVisible, about.heading]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-black py-20 overflow-hidden">
      <div className="container-custom section-padding">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter text-center">
            ABOUT <span className="text-amber-400">US</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {about.images.slice(0, 4).map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg img-zoom">
                <img src={src} alt={`Team ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className={`flex flex-col gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="w-10 h-1 bg-amber-400" />
            <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">{displayed || about.heading}</h3>
            <p className="text-white/70 text-base leading-relaxed">{about.paragraph1}</p>
            <p className="text-white/70 text-base leading-relaxed">{about.paragraph2}</p>
            <p className="text-white/70 text-base leading-relaxed">{about.paragraph3}</p>
            <div className="flex gap-8 mt-2">
              <div>
                <p className="text-3xl font-black text-amber-400">{about.stat1Value}</p>
                <p className="text-white/50 text-sm">{about.stat1Label}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-400">{about.stat2Value}</p>
                <p className="text-white/50 text-sm">{about.stat2Label}</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-400">{about.stat3Value}</p>
                <p className="text-white/50 text-sm">{about.stat3Label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
