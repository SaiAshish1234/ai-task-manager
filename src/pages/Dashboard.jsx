const STATS = [
  { label: 'Total Tasks', value: '0', icon: 'ti-clipboard-list', color: '#6366f1', bg: '#eef2ff' },
  { label: 'Completed', value: '0', icon: 'ti-circle-check', color: '#22c55e', bg: '#f0fdf4' },
  { label: 'In Progress', value: '0', icon: 'ti-loader', color: '#f59e0b', bg: '#fffbeb' },
  { label: 'Overdue', value: '0', icon: 'ti-alert-circle', color: '#ef4444', bg: '#fef2f2' },
];

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          marginBottom: '0.2rem',
        }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          Your productivity overview
        </p>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '1.5rem',
      }}>
        {STATS.map(({ label, value, icon, color, bg }) => (
          <div key={label} style={{
            background: '#ffffff',
            border: '1px solid #f1f5f9',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.875rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: '8px',
              background: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <i className={`ti ${icon}`} style={{ fontSize: '17px', color }} />
            </div>
            <div>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 500,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.2rem',
              }}>
                {label}
              </div>
              <div style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#0f172a',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder chart area */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #f1f5f9',
        borderRadius: '10px',
        padding: '3rem 2rem',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          width: '40px', height: '40px',
          background: '#f8fafc',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 0.875rem',
        }}>
          <i className="ti ti-chart-bar" style={{ fontSize: '20px', color: '#cbd5e1' }} />
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.25rem' }}>
          No data yet
        </div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          Add some tasks to your board to see analytics here
        </div>
      </div>
    </div>
  );
}