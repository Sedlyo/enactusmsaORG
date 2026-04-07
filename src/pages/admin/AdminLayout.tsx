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
import { LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-bold text-lg">Enactus MSA</span>
          <span className="text-zinc-500 text-sm">Admin Panel</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </header>

      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
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
