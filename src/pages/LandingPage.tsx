import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Stats from '@/sections/Stats';
import Board from '@/sections/Board';
import Services from '@/sections/Services';
import Sponsors from '@/sections/Sponsors';
import Team from '@/sections/Team';
import GetInTouch from '@/sections/GetInTouch';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative font-sans selection:bg-amber-400 selection:text-black">
      {/* Premium background grid overlay texture */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Global persistent navigation */}
      <Navigation />
      
      {/* FIXED: Changed from "relative z-10" to just "relative" */}
      <main className="relative">
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