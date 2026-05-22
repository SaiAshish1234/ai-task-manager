export default function Header({ onMenuClick }) {
  return (
    <header style={{
      height: '52px',
      background: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <button
          onClick={onMenuClick}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#94a3b8',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '4px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#64748b'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
        >
          <i className="ti ti-menu-2" aria-hidden="true" />
        </button>

        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.82rem',
          color: '#94a3b8',
        }}>
          <span>TaskAI</span>
          <i className="ti ti-chevron-right" style={{ fontSize: '12px' }} />
          <span style={{ color: '#0f172a', fontWeight: 500 }}>My Workspace</span>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Search */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '0.35rem 0.75rem',
          color: '#94a3b8',
          fontSize: '0.75rem',
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          <i className="ti ti-search" style={{ fontSize: '13px' }} />
          Search
          <span style={{
            fontSize: '0.65rem',
            background: '#e2e8f0',
            color: '#94a3b8',
            padding: '1px 5px',
            borderRadius: '3px',
            marginLeft: '4px',
          }}>⌘K</span>
        </button>

        {/* New Task */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: '#6366f1',
          border: 'none',
          borderRadius: '6px',
          padding: '0.35rem 0.875rem',
          color: '#ffffff',
          fontSize: '0.78rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'opacity 0.15s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <i className="ti ti-plus" style={{ fontSize: '13px' }} />
          New Task
        </button>
      </div>
    </header>
  );
}