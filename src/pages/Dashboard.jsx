const STATS = [
  { label: 'Total Tasks', value: '0', icon: 'ti-clipboard-list', color: '#a5b4fc', glow: 'rgba(99,102,241,0.3)', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' },
  { label: 'Completed', value: '0', icon: 'ti-circle-check', color: '#6ee7b7', glow: 'rgba(34,211,153,0.3)', bg: 'rgba(34,211,153,0.1)', border: 'rgba(34,211,153,0.2)' },
  { label: 'In Progress', value: '0', icon: 'ti-loader', color: '#fcd34d', glow: 'rgba(251,191,36,0.3)', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
  { label: 'Overdue', value: '0', icon: 'ti-alert-circle', color: '#fca5a5', glow: 'rgba(239,68,68,0.3)', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
];

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{
          fontSize: '1.35rem', fontWeight: 700,
          color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.25rem',
        }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
          Your productivity overview
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px', marginBottom: '1.5rem',
      }}>
        {STATS.map(({ label, value, icon, color, glow, bg, border }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${border}`,
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
            boxShadow: `0 0 20px ${glow}`,
            transition: 'transform 0.15s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: bg, border: `1px solid ${border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <i className={`ti ${icon}`} style={{ fontSize: '18px', color, filter: `drop-shadow(0 0 6px ${glow})` }} />
            </div>
            <div>
              <div style={{
                fontSize: '0.65rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', letterSpacing: '0.07em',
                marginBottom: '0.25rem',
              }}>
                {label}
              </div>
              <div style={{
                fontSize: '1.75rem', fontWeight: 700,
                color, letterSpacing: '-0.03em', lineHeight: 1,
                filter: `drop-shadow(0 0 8px ${glow})`,
              }}>
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          width: '44px', height: '44px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 0.875rem',
        }}>
          <i className="ti ti-chart-bar" style={{ fontSize: '22px', color: '#a5b4fc' }} />
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>
          No data yet
        </div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>
          Add some tasks to your board to see analytics here
        </div>
      </div>
    </div>
  );
}