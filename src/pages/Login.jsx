import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/board');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080910',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      padding: '2rem',
    }}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)', top: '-200px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)', bottom: '-150px', left: '-50px' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,153,0.15) 0%, transparent 70%)', top: '100px', left: '100px' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* Hero section */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '3rem', maxWidth: '600px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '2rem' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.5)' }}>
            <i className="ti ti-check" style={{ fontSize: '16px', color: '#fff' }} />
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>TaskAI</span>
        </div>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '99px', padding: '5px 14px', fontSize: '0.72rem', fontWeight: 500, color: '#a5b4fc', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a5b4fc', boxShadow: '0 0 6px #6366f1', display: 'inline-block' }} />
          Manage Smarter with AI
        </div>

        {/* Glass refraction title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          marginBottom: '1rem',
          background: 'linear-gradient(105deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.1) 25%, rgba(165,180,252,0.8) 50%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.9) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.4))',
        }}>
          Tasks that think.<br />Work that flows.
        </h1>

        <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, fontWeight: 300, letterSpacing: '0.01em', maxWidth: '480px', margin: '0 auto 2rem' }}>
          A beautiful AI-powered task manager with Kanban board, real-time sync, and Gemini AI assistance — built to help you get things done.
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['✦ AI Task Breakdown', '⊞ Kanban Board', '⊟ Live Dashboard'].map((f) => (
            <div key={f} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '99px', padding: '4px 12px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Login card */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '2rem',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
          Welcome back
        </h2>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>
          Sign in to your TaskAI account
        </p>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '0.65rem 0.875rem', fontSize: '0.78rem', color: '#fca5a5', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
          <input
            type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.85rem', color: '#fff', outline: 'none', transition: 'border-color 0.15s', fontFamily: 'Inter, sans-serif' }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
          <input
            type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
            style={{ width: '100%', padding: '0.65rem 0.875rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.85rem', color: '#fff', outline: 'none', transition: 'border-color 0.15s', fontFamily: 'Inter, sans-serif' }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '0.7rem', background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '1.25rem', boxShadow: '0 0 20px rgba(99,102,241,0.3)', fontFamily: 'Inter, sans-serif' }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#a5b4fc', fontWeight: 500, textDecoration: 'none' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}