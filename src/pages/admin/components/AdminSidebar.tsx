import { NavLink } from 'react-router-dom';
import {
  Home,
  FileText,
  BarChart3,
  Users,
  Handshake,
  Phone,
  UserCircle,
  Layers,
  Settings,
} from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: Home, end: true },
  { to: '/admin/hero', label: 'Hero', icon: FileText },
  { to: '/admin/about', label: 'About', icon: FileText },
  { to: '/admin/stats', label: 'Stats', icon: BarChart3 },
  { to: '/admin/board', label: 'Board', icon: Users },
  { to: '/admin/committees', label: 'Committees', icon: Layers },
  { to: '/admin/sponsors', label: 'Sponsors', icon: Handshake },
  { to: '/admin/team', label: 'Team', icon: UserCircle },
  { to: '/admin/contact', label: 'Contact', icon: Phone },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
] as const;

export default function AdminSidebar() {
  return (
    <aside className="w-56 bg-zinc-900 border-r border-zinc-800 min-h-[calc(100vh-3.5rem)] p-4">
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon, ...rest }) => (
          <NavLink
            key={to}
            to={to}
            end={'end' in rest}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-amber-400/10 text-amber-400'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
