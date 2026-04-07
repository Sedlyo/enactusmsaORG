import { useContentState } from '@/context/ContentContext';

export default function DashboardHome() {
  const { content } = useContentState();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-zinc-400 mb-8">
        Welcome to the <span className="text-amber-400">{content.settings.siteName}</span> admin panel. Use the sidebar to edit each section of the website.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Committees', count: content.committees.length },
          { label: 'Team Members', count: content.team.length },
          { label: 'Sponsors', count: content.sponsors.logos.length },
          { label: 'About Images', count: content.about.images.length },
        ].map(({ label, count }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-amber-400">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
