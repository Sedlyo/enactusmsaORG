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
      className="relative w-full bg-black pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden flex items-start"
    >
      <div className="container-custom px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="w-10 h-1 bg-amber-400 mb-4 md:mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
              {contact.heading}
            </h2>
            <p className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-10">
              {contact.subheading}
            </p>
            <div className="flex flex-col gap-4 md:gap-6">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-colors group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 group-hover:border-amber-400 flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <span className="text-sm md:text-base break-words">{contact.email}</span>
              </a>
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 group-hover:border-amber-400 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm md:text-base">{contact.phone}</span>
                </a>
              )}
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="text-sm md:text-base break-words">{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Right - form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
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
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-amber-400/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-amber-400/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white/50 text-xs uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Your message..."
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-amber-400/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition-colors"
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
