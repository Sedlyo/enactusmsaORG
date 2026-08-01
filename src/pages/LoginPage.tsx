import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Soft Ambient Radial Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-white/50 hover:text-amber-400 text-xs font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
      >
        &larr; Back to Website
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-zinc-950/80 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10 hover:border-amber-400/30 transition-all duration-500"
      >
        {/* Brand Logo & Header */}
        <div className="text-center flex flex-col items-center">
          <img 
            src="/assets/enactusMSA2.png" 
            alt="Enactus MSA Logo" 
            className="h-16 w-auto object-contain mb-3 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]" 
          />
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Admin Login</h1>
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mt-1">Enactus MSA Dashboard</p>
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-xl animate-in fade-in duration-300">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@enactusmsa.org"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-amber-400 text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-amber-300 transition-all duration-300 disabled:opacity-50 shadow-[0_10px_25px_rgba(251,191,36,0.25)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  );
}

