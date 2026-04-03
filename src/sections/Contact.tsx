import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Contact() {
  const { content } = useContent();
  const { contact } = content;
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
    <section ref={sectionRef} className="relative min-h-screen w-full bg-black py-20 overflow-hidden flex items-center">
      <div className="container-custom section-padding w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="w-10 h-1 bg-amber-400 mb-6" />
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6">{contact.heading}</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">{contact.subheading}</p>
            <div className="flex flex-col gap-6">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-amber-400 flex items-center justify-center transition-colors">
                  <Mail size={18} />
                </div>
                <span>{contact.email}</span>
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-amber-400 flex items-center justify-center transition-colors">
                  <Phone size={18} />
                </div>
                <span>{contact.phone}</span>
              </a>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span>{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Right - form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">Name</label>
                <input type="text" placeholder="Your name" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">Email</label>
                <input type="email" placeholder="your@email.com" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">Message</label>
                <textarea rows={4} placeholder="Your message..." className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-colors resize-none" />
              </div>
              <button className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}