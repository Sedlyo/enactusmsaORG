interface Props {
  size?: number;
}

export default function TikTokIcon({ size = 20 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5 2.592 2.592 0 0 1-2.59-2.5 2.592 2.592 0 0 1 2.59-2.5c.28 0 .54.04.79.1V9.87c-.26-.03-.53-.05-.79-.05a5.674 5.674 0 0 0-5.67 5.67 5.674 5.674 0 0 0 5.67 5.67 5.674 5.674 0 0 0 5.67-5.67V8.72a7.354 7.354 0 0 0 4.3 1.38V6.41a4.33 4.33 0 0 1-3.13-.59z" />
    </svg>
  );
}
