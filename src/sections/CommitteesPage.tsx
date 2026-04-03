import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface Props {
  initialIndex?: number;
  onClose: () => void;
}

export default function CommitteesPage({ initialIndex = 0, onClose }: Props) {
  const { content } = useContent();
  const committees = content.committees;
  const [active, setActive] = useState(initialIndex);

  useEffect(() => { setActive(initialIndex); }, [initialIndex]);
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  const prev = () => setActive((i) => (i - 1 + committees.length) % committees.length);
  const next = () => setActive((i) => (i + 1) % committees.length);
  const current = committees[active];

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      <button onClick={onClose} className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors">
        <X size={28} />
      </button>
      <div className="absolute top-6 left-6 z-10">
        <img src="/assets/enactusMSA2.png" alt="Enactus MSA" className="h-10 w-auto" />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <img key={active} src="/assets/placeholder.png" alt={current.name} className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-12 left-0 right-0 px-8 md:px-20 max-w-4xl">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">{current.tagline}</p>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">{current.name}</h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">{current.description}</p>
        </div>

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"><ChevronLeft size={40} /></button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"><ChevronRight size={40} /></button>
      </div>

      <div className="flex overflow-x-auto border-t border-white/10 bg-black/80">
        {committees.map((c, i) => (
          <button key={c.name} onClick={() => setActive(i)} className={`relative flex-shrink-0 w-32 md:w-44 h-24 md:h-32 overflow-hidden transition-all duration-300 ${i === active ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
            <img src="/assets/placeholder.png" alt={c.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-2">
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">{c.name}</span>
            </div>
            {i === active && <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400" />}
          </button>
        ))}
      </div>
    </div>
  );
}