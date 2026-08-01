interface Props {
  active: boolean;
}

export default function TransitionOverlay({ active }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-500 ${
        active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Primary yellow panel */}
      <div
        className={`absolute inset-0 bg-amber-400 transition-transform duration-500 ${
          active ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      {/* Accent dark amber panel */}
      <div
        className={`absolute inset-0 bg-amber-500 transition-transform duration-500 delay-75 ${
          active ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      {/* Brand logo / text overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 delay-150 ${
          active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <img src="/assets/enactusMSA2.png" alt="Enactus MSA" className="h-16 sm:h-24 w-auto brightness-0" />
          <span className="text-black text-3xl sm:text-5xl font-black tracking-tighter uppercase">
            ENACTUS MSA
          </span>
        </div>
      </div>
    </div>
  );
}