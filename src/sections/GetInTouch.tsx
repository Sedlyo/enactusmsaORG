import { useInView } from '../hooks/use-in-view';

export default function GetInTouch() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section ref={ref} className="relative w-full bg-black py-2 overflow-hidden">
      <div className="container-custom section-padding">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4">
            Want to join us or looking to sponsor us?
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter">
            Get In <span className="text-amber-400">Touch</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
