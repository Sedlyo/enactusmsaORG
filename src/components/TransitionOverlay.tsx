interface Props {
  active: boolean;
}

export default function TransitionOverlay({ active }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-500 ${
        active ? 'opacity-100 scale-100' : 'opacity-0 scale-y-0'
      }`}
      style={{ transformOrigin: 'top' }}
    >
      <div
        className={`absolute inset-0 bg-amber-400 transition-all duration-500 ${
          active ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
      />
      <div
        className={`absolute inset-0 bg-amber-500 transition-all duration-500 delay-75 ${
          active ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 delay-200 ${
          active ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <span className="text-black text-6xl font-black tracking-tighter">ENACTUS</span>
      </div>
    </div>
  );
}
