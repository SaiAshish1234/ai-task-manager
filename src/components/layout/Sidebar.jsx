import { NavLink } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const NAV_ITEMS = [
  { label: 'Board', href: '/board', icon: 'ti-layout-kanban' },
  { label: 'Dashboard', href: '/dashboard', icon: 'ti-chart-bar' },
];

export default function Sidebar({ open, user }) {
  if (!open) return null;

  return (
    <aside style={{
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      width: '220px',
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRight: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      padding: '0',
    }}>
      {/* Logo */}
      <div style={{
        padding: '1.25rem 1.25rem 1rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '30px', height: '30px',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          borderRadius: '9px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 16px rgba(99,102,241,0.5)',
        }}>
          <i className="ti ti-check" style={{ fontSize: '14px', color: '#fff' }} />
        </div>
        <div>
          <div style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.01em',
          }}>
            TaskAI
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0.875rem 0.75rem' }}>
        <div style={{
          fontSize: '0.6rem',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0 0.5rem',
          marginBottom: '0.5rem',
        }}>
          Workspace
        </div>
        {NAV_ITEMS.map(({ label, href, icon }) => (
          <NavLink
            key={label}
            to={href}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              textDecoration: 'none',
              marginBottom: '3px',
              background: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
              border: isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
              color: isActive ? '#a5b4fc' : 'rgba(255,255,255,0.4)',
              fontSize: '0.78rem',
              fontWeight: isActive ? 500 : 400,
              transition: 'all 0.15s',
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.style.background.includes('0.2')) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.style.background.includes('0.2')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
              }
            }}
          >
            <i className={`ti ${icon}`} style={{ fontSize: '15px' }} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{
        padding: '0.875rem 1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
          <div style={{
            width: '30px', height: '30px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.68rem', fontWeight: 700, color: '#fff',
            flexShrink: 0,
            boxShadow: '0 0 10px rgba(99,102,241,0.4)',
          }}>
            {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '0.75rem', fontWeight: 500,
              color: 'rgba(255,255,255,0.8)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {user?.user_metadata?.full_name || user?.email || 'User'}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)' }}>
              Free plan
            </div>
          </div>
        </div>

        <button
          onClick={async () => { await supabase.auth.signOut(); }}
          title="Sign out"
          style={{
            background: 'transparent', border: 'none',
            cursor: 'pointer', color: 'rgba(255,255,255,0.3)',
            fontSize: '15px', display: 'flex', alignItems: 'center',
            padding: '4px', borderRadius: '4px', transition: 'color 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
        >
          <i className="ti ti-logout" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
