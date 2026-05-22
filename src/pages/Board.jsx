import KanbanBoard from '../components/kanban/KanbanBoard';

export default function Board() {
  return (
    <div>
      <div style={{
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            marginBottom: '0.2rem',
          }}>
            My Board
          </h1>
          <p style={{
            fontSize: '0.78rem',
            color: '#94a3b8',
            fontWeight: 400,
          }}>
            Drag tasks between columns to update their status
          </p>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'High', 'Medium', 'Low'].map((f, i) => (
            <button key={f} style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              padding: '0.3rem 0.75rem',
              borderRadius: '99px',
              border: '1px solid',
              borderColor: i === 0 ? '#6366f1' : '#e2e8f0',
              background: i === 0 ? '#eef2ff' : 'transparent',
              color: i === 0 ? '#6366f1' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
}