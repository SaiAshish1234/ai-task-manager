import { useState } from 'react';
import KanbanBoard from '../components/kanban/KanbanBoard';

export default function Board() {
  const [addToColumn, setAddToColumn] = useState(null);

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
  fontSize: '1.75rem',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  marginBottom: '0.25rem',
  background: 'linear-gradient(105deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.1) 25%, rgba(165,180,252,0.8) 50%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.9) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 0 16px rgba(99,102,241,0.4))',
}}>
  My Board
</h1>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            Drag tasks between columns to update their status
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {['All', 'High', 'Medium', 'Low'].map((f, i) => (
            <button key={f} style={{
              fontSize: '0.7rem', fontWeight: 500,
              padding: '0.28rem 0.75rem', borderRadius: '99px',
              border: '1px solid',
              borderColor: i === 0 ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)',
              background: i === 0 ? 'rgba(99,102,241,0.2)' : 'transparent',
              color: i === 0 ? '#a5b4fc' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <KanbanBoard
        externalAddColumn={addToColumn}
        onExternalAddDone={() => setAddToColumn(null)}
      />
    </div>
  );
}