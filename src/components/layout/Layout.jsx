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
      background: '#f8fafc',
    }}>
      <Sidebar open={sidebarOpen} user={user} />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: sidebarOpen ? '232px' : '0',
        transition: 'margin-left 0.25s ease',
        minHeight: '100vh',
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