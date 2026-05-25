import { useState } from 'react';
import { breakdownTask, suggestPriority, generateDescription } from '../../lib/ai';

export default function AIPanel({ task, onAddSubtasks, onUpdateTask, onClose, isDraggable }) {
  const [loading, setLoading] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleBreakdown = async () => {
    setLoading('breakdown'); setError(''); setResult(null);
    try {
      const tasks = await breakdownTask(task.title);
      setSubtasks(tasks); setResult('breakdown');
    } catch { setError('Failed to generate subtasks. Try again.'); }
    setLoading(null);
  };

  const handlePriority = async () => {
    setLoading('priority'); setError(''); setResult(null);
    try {
      const priority = await suggestPriority(task.title);
      setResult({ type: 'priority', value: priority });
      onUpdateTask({ ...task, priority });
    } catch { setError('Failed to suggest priority. Try again.'); }
    setLoading(null);
  };

  const handleDescription = async () => {
    setLoading('description'); setError(''); setResult(null);
    try {
      const description = await generateDescription(task.title);
      setResult({ type: 'description', value: description });
      onUpdateTask({ ...task, description });
    } catch { setError('Failed to generate description. Try again.'); }
    setLoading(null);
  };

  const PRIORITY_COLORS = {
    high:   { color: '#fca5a5', bg: 'rgba(239,68,68,0.15)' },
    medium: { color: '#fcd34d', bg: 'rgba(251,191,36,0.15)' },
    low:    { color: '#6ee7b7', bg: 'rgba(34,211,153,0.15)' },
  };

  const panelContent = (
    <div style={{
      background: 'rgba(12,12,20,0.85)',
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: isDraggable ? '0 0 14px 14px' : '16px',
      padding: '1.25rem',
      boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
    }}>
      {/* Header */}
      {!isDraggable && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
              <div style={{
                width: '22px', height: '22px',
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 10px rgba(99,102,241,0.5)',
              }}>
                <i className="ti ti-sparkles" style={{ fontSize: '11px', color: '#fff' }} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>AI Assistant</span>
            </div>
            <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>
              Working on: <strong style={{ color: '#a5b4fc' }}>{task.title}</strong>
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
            <i className="ti ti-x" />
          </button>
        </div>
      )}

      {isDraggable && (
        <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.875rem' }}>
          Working on: <strong style={{ color: '#a5b4fc' }}>{task.title}</strong>
        </p>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
        {[
          { key: 'breakdown', icon: 'ti-list-check', label: 'Break into subtasks', desc: 'Generate 3-5 actionable subtasks', onClick: handleBreakdown, color: '#a5b4fc', bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.25)' },
          { key: 'priority',  icon: 'ti-flag',       label: 'Suggest priority',    desc: 'AI picks high, medium, or low', onClick: handlePriority,  color: '#fcd34d', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.25)' },
          { key: 'description', icon: 'ti-writing',  label: 'Generate description', desc: 'Write a clear task description', onClick: handleDescription, color: '#6ee7b7', bg: 'rgba(34,211,153,0.15)', border: 'rgba(34,211,153,0.25)' },
        ].map(({ key, icon, label, desc, onClick, color, bg, border }) => (
          <button key={key} onClick={onClick} disabled={loading !== null} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.7rem 0.875rem',
            background: loading === key ? bg : 'rgba(255,255,255,0.04)',
            border: `1px solid ${loading === key ? border : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '10px', cursor: loading !== null ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s', textAlign: 'left',
            opacity: loading !== null && loading !== key ? 0.4 : 1,
            boxShadow: loading === key ? `0 0 16px ${bg}` : 'none',
          }}
            onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = border; } }}
            onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; } }}
          >
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {loading === key
                ? <i className="ti ti-loader" style={{ fontSize: '14px', color, animation: 'spin 1s linear infinite' }} />
                : <i className={`ti ${icon}`} style={{ fontSize: '14px', color }} />
              }
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{label}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{desc}</div>
            </div>
            {loading !== key && <i className="ti ti-chevron-right" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }} />}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '0.65rem', fontSize: '0.75rem', color: '#fca5a5', marginBottom: '0.875rem' }}>
          {error}
        </div>
      )}

      {/* Subtasks result */}
      {result === 'breakdown' && subtasks.length > 0 && (
        <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', padding: '0.875rem', marginBottom: '0.875rem' }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 600, color: '#a5b4fc', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Suggested subtasks</div>
          {subtasks.map((subtask, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '0.4rem 0', borderBottom: i < subtasks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: '#a5b4fc', flexShrink: 0, marginTop: '1px' }}>
                {i + 1}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{subtask}</span>
            </div>
          ))}
          <button onClick={() => { onAddSubtasks(subtasks); onClose(); }} style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '7px', color: '#fff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 16px rgba(99,102,241,0.4)' }}>
            Add all as tasks
          </button>
        </div>
      )}

      {/* Priority result */}
      {result?.type === 'priority' && (
        <div style={{ background: PRIORITY_COLORS[result.value]?.bg, border: `1px solid ${PRIORITY_COLORS[result.value]?.color}33`, borderRadius: '8px', padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.875rem' }}>
          <i className="ti ti-circle-check" style={{ fontSize: '15px', color: PRIORITY_COLORS[result.value]?.color }} />
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>
            Priority set to <strong style={{ color: PRIORITY_COLORS[result.value]?.color, textTransform: 'capitalize' }}>{result.value}</strong>
          </span>
        </div>
      )}

      {/* Description result */}
      {result?.type === 'description' && (
        <div style={{ background: 'rgba(34,211,153,0.08)', border: '1px solid rgba(34,211,153,0.2)', borderRadius: '10px', padding: '0.875rem', marginBottom: '0.875rem' }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 600, color: '#6ee7b7', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Generated description</div>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{result.value}</p>
        </div>
      )}

      {!isDraggable && (
        <button onClick={onClose} style={{ width: '100%', padding: '0.55rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer' }}>
          Close
        </button>
      )}
    </div>
  );

  if (isDraggable) return panelContent;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '440px' }}>
        {panelContent}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
