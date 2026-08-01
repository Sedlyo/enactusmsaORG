import { Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';

export default function Contact() {
  const content = useContent();
  const { contact } = content;
  const { ref, isVisible } = useInView(0.2);

  return (
    <section
      ref={ref}
      className="relative w-full bg-black pt-12 pb-24 border-t border-white/5 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-custom section-padding w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Info Column */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="w-12 h-1 bg-amber-400 mb-6 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {contact.heading}
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">
              {contact.subheading}
            </p>
            <div className="flex flex-col gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] group-hover:border-amber-400 group-hover:bg-amber-400/10 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Mail size={20} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-base font-semibold break-words">{contact.email}</span>
              </a>
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] group-hover:border-amber-400 group-hover:bg-amber-400/10 flex items-center justify-center transition-all duration-300 shadow-md">
                    <Phone size={20} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-base font-semibold">{contact.phone}</span>
                </a>
              )}
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center shadow-md">
                  <MapPin size={20} />
                </div>
                <span className="text-base font-semibold break-words">{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                const subject = encodeURIComponent(`Contact from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
                window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
                form.reset();
              }}
              className="bg-zinc-950/80 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col gap-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-amber-400/30 transition-all duration-500"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we help or collaborate?"
                  className="px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 button-primary w-full py-4 text-sm font-black uppercase tracking-widest bg-amber-400 text-black hover:bg-amber-300 transition-all duration-300 rounded-xl shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

