import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) return;
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
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
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="ti ti-check" style={{ fontSize: '16px', color: '#fff' }} />
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>TaskAI</span>
        </div>

        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          marginBottom: '0.25rem',
        }}>
          Create your account
        </h1>
        <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '1.75rem' }}>
          Start managing tasks smarter with AI
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            padding: '0.65rem 0.875rem',
            fontSize: '0.78rem',
            color: '#ef4444',
            marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {/* Name */}
        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#374151',
            marginBottom: '0.375rem',
          }}>
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="G Sai Ashish"
            style={{
              width: '100%',
              padding: '0.6rem 0.875rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '7px',
              fontSize: '0.85rem',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#374151',
            marginBottom: '0.375rem',
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '0.6rem 0.875rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '7px',
              fontSize: '0.85rem',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#374151',
            marginBottom: '0.375rem',
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => { if (e.key === 'Enter') handleSignup(); }}
            style={{
              width: '100%',
              padding: '0.6rem 0.875rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '7px',
              fontSize: '0.85rem',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSignup}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.65rem',
            background: loading ? '#a5b4fc' : '#6366f1',
            border: 'none',
            borderRadius: '7px',
            color: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.15s',
            marginBottom: '1.25rem',
          }}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p style={{ fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}