import { useContent, siteContent as defaults } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';

export default function Sponsors() {
  const content = useContent();
  const sponsors = content.sponsors || defaults.sponsors;
  const logos = sponsors.logos || [];
  const { ref, isVisible } = useInView(0.2);

  return (
    <section ref={ref} className="relative w-full bg-black py-24 overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="container-custom section-padding mb-16 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-eyebrow mb-3">Partners &amp; Supporters</p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter mb-6">
            OUR <span className="text-amber-400">SPONSORS</span>
          </h2>
          <p className="text-white/55 text-base sm:text-lg max-w-2xl leading-relaxed">{sponsors.description}</p>
        </div>
      </div>

      {/* Sponsor logos grid */}
      {logos.length > 0 && (
        <div className={`container-custom section-padding mb-16 relative z-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center aspect-[3/2] p-6 border border-white/[0.08] rounded-xl transition-all duration-400 group hover:border-amber-400/40 hover:-translate-y-1 hover:bg-white/[0.03]"
              >
                <img
                  src={logo}
                  alt={`Sponsor ${i + 1}`}
                  className="h-14 w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-400 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partner CTA strip */}
      <div className={`container-custom section-padding relative z-10 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="border border-white/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="section-eyebrow mb-2">Work With Us</p>
            <p className="text-white text-lg sm:text-xl font-black uppercase tracking-tight">Become a Partner</p>
            <p className="text-white/40 text-sm mt-1 leading-relaxed max-w-md">
              Join the network of organizations supporting student-led entrepreneurship at MSA University.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 button-primary text-sm px-7 py-3"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}