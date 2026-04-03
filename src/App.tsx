import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Stats from './sections/Stats';
import Board from './sections/Board';
import Services from './sections/Services';
import Sponsors from './sections/Sponsors';
import Team from './sections/Team';
import GetInTouch from './sections/GetInTouch';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AdminPage from './pages/AdminPage';
import { ContentProvider } from './context/ContentContext';
import './App.css';

function AppRouter() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#/admin');

  useEffect(() => {
    const handleHash = () => setIsAdmin(window.location.hash === '#/admin');
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (isAdmin) return <AdminPage />;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="stats"><Stats /></section>
        <section id="board"><Board /></section>
        <section id="services"><Services /></section>
        <section id="sponsors"><Sponsors /></section>
        <section id="team"><Team /></section>
        <section id="getintouch"><GetInTouch /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <AppRouter />
    </ContentProvider>
  );
}

export default App;