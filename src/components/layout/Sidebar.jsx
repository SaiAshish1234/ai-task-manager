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
      width: '232px',
      background: '#ffffff',
      borderRight: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      padding: '0',
    }}>
      {/* Logo */}
      <div style={{
        padding: '1.25rem 1.25rem 1rem',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '28px', height: '28px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <i className="ti ti-check" style={{ fontSize: '14px', color: '#fff' }} />
        </div>
        <div>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#0f172a',
            letterSpacing: '-0.01em',
          }}>
            TaskAI
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0.75rem 0.625rem' }}>
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          color: '#94a3b8',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          padding: '0 0.625rem',
          marginBottom: '0.375rem',
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
              padding: '0.45rem 0.625rem',
              borderRadius: '6px',
              textDecoration: 'none',
              marginBottom: '2px',
              background: isActive ? '#f1f5f9' : 'transparent',
              color: isActive ? '#6366f1' : '#64748b',
              fontSize: '0.82rem',
              fontWeight: isActive ? 500 : 400,
              transition: 'all 0.15s',
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.color = '#0f172a';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#64748b';
              }
            }}
          >
            <i className={`ti ${icon}`} style={{ fontSize: '15px' }} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div style={{
        padding: '0.875rem 1.25rem',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
          <div style={{
            width: '30px', height: '30px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#fff',
            flexShrink: 0,
          }}>
            {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 500,
              color: '#0f172a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {user?.user_metadata?.full_name || user?.email || 'User'}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
              Free plan
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={async () => { await supabase.auth.signOut(); }}
          title="Sign out"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#94a3b8',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '4px',
            transition: 'color 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
        >
          <i className="ti ti-logout" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
