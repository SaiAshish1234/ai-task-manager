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
            fontSize: '1.35rem', fontWeight: 700,
            color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.25rem',
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