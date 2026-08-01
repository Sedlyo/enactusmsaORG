import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from './components/AdminSidebar';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import StatsEditor from './editors/StatsEditor';
import BoardEditor from './editors/BoardEditor';
import CommitteesEditor from './editors/CommitteesEditor';
import SponsorsEditor from './editors/SponsorsEditor';
import TeamEditor from './editors/TeamEditor';
import ContactEditor from './editors/ContactEditor';
import DashboardHome from './editors/DashboardHome';
import SettingsPage from './editors/SettingsPage';
import { LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((current) => !current)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold text-lg">Enactus MSA</span>
            <span className="text-zinc-500 text-sm hidden sm:inline">Admin Panel</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-8 min-h-[calc(100vh-3.5rem)]">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="hero" element={<HeroEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="stats" element={<StatsEditor />} />
            <Route path="board" element={<BoardEditor />} />
            <Route path="committees" element={<CommitteesEditor />} />
            <Route path="sponsors" element={<SponsorsEditor />} />
            <Route path="team" element={<TeamEditor />} />
            <Route path="contact" element={<ContactEditor />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
