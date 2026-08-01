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
      {/* Centered Large Brand Logo */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-400 delay-150 ${
          active ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <img
          src="/assets/enactusMSA2.png"
          alt="Enactus MSA"
          className="h-28 sm:h-40 md:h-48 max-w-[85vw] w-auto object-contain brightness-0 drop-shadow-2xl"
        />
      </div>
    </div>
  );
}