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
  X,
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

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-zinc-900 border-r border-zinc-800 p-4 transition-transform duration-300 md:static md:translate-x-0 md:w-56 md:border-r md:z-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-4 flex items-center justify-between md:hidden">
        <span className="text-white font-semibold">Menu</span>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/5"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon, ...rest }) => (
          <NavLink
            key={to}
            to={to}
            end={'end' in rest}
            onClick={onClose}
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
