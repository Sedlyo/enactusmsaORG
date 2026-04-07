import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';

export default function Sponsors() {
  const content = useContent();
  const { sponsors } = content;
  const { ref, isVisible } = useInView(0.2);

  return (
    <section ref={ref} className="relative w-full bg-black py-16 overflow-hidden">
      {/* Header */}
      <div className="container-custom section-padding mb-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3">Partners & Supporters</p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter mb-4">
            OUR <span className="text-amber-400">SPONSORS</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl">{sponsors.description}</p>
        </div>
      </div>

      {/* Sponsor logos */}
      {sponsors.logos.length > 0 && (
        <div className={`container-custom section-padding mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

      {/* Scrolling background text */}
      <div className="flex flex-col gap-1 overflow-hidden opacity-[0.8] pointer-events-none select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="inline-flex items-center text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mr-10">
              <img src="/assets/EnactusLOGO.png" alt="" className="h-6 w-6 object-contain mx-3 inline-block" />
              {sponsors.title}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="inline-flex items-center text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mr-10">
              <img src="/assets/EnactusLOGO.png" alt="" className="h-6 w-6 object-contain mx-3 inline-block" />
              {sponsors.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
