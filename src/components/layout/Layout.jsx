import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#080910',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          top: '-200px', right: '-100px',
        }} />
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
          bottom: '-150px', left: '100px',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,153,0.15) 0%, transparent 70%)',
          top: '100px', left: '-100px',
        }} />
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)',
          bottom: '100px', right: '200px',
        }} />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <Sidebar open={sidebarOpen} user={user} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: sidebarOpen ? '220px' : '0',
        transition: 'margin-left 0.25s ease',
        minHeight: '100vh',
        position: 'relative', zIndex: 1,
      }}>
        <Header onMenuClick={() => setSidebarOpen(o => !o)} />
        <main style={{
          flex: 1,
          padding: '2rem 2.5rem',
          overflowY: 'auto',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}