export default function Header({ onMenuClick }) {
  return (
    <header style={{
      height: '52px',
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <button
          onClick={onMenuClick}
          style={{
            background: 'transparent', border: 'none',
            cursor: 'pointer', color: 'rgba(255,255,255,0.3)',
            fontSize: '16px', display: 'flex', alignItems: 'center',
            padding: '4px', borderRadius: '4px', transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
        >
          <i className="ti ti-menu-2" aria-hidden="true" />
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)',
        }}>
          <span>TaskAI</span>
          <i className="ti ti-chevron-right" style={{ fontSize: '11px' }} />
          <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>My Workspace</span>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Search */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '7px',
          padding: '0.3rem 0.75rem',
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.72rem', cursor: 'pointer',
          transition: 'all 0.15s',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
          }}
        >
          <i className="ti ti-search" style={{ fontSize: '13px' }} />
          Search
          <span style={{
            fontSize: '0.62rem',
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.3)',
            padding: '1px 5px', borderRadius: '3px', marginLeft: '2px',
          }}>⌘K</span>
        </button>

        {/* New Task */}
        <button
  onClick={() => window.dispatchEvent(new CustomEvent('newTask'))}
  style={{
    display: 'flex', alignItems: 'center', gap: '5px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    border: 'none', borderRadius: '7px',
    padding: '0.32rem 0.875rem',
    color: '#ffffff', fontSize: '0.75rem', fontWeight: 600,
    cursor: 'pointer', transition: 'opacity 0.15s',
    boxShadow: '0 0 16px rgba(99,102,241,0.4)',
  }}
  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
>
  <i className="ti ti-plus" style={{ fontSize: '13px' }} />
  New Task
</button>
      </div>
    </header>
  );
}
