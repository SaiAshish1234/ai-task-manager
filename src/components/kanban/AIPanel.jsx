import { useState } from 'react';
import { breakdownTask, suggestPriority, generateDescription } from '../../lib/ai';

export default function AIPanel({ task, onAddSubtasks, onUpdateTask, onClose }) {
  const [loading, setLoading] = useState(null); // 'breakdown' | 'priority' | 'description' | null
  const [subtasks, setSubtasks] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleBreakdown = async () => {
    setLoading('breakdown');
    setError('');
    setResult(null);
    try {
      const tasks = await breakdownTask(task.title);
      setSubtasks(tasks);
      setResult('breakdown');
    } catch {
      setError('Failed to generate subtasks. Try again.');
    }
    setLoading(null);
  };

  const handlePriority = async () => {
    setLoading('priority');
    setError('');
    setResult(null);
    try {
      const priority = await suggestPriority(task.title);
      setResult({ type: 'priority', value: priority });
      onUpdateTask({ ...task, priority });
    } catch {
      setError('Failed to suggest priority. Try again.');
    }
    setLoading(null);
  };

  const handleDescription = async () => {
    setLoading('description');
    setError('');
    setResult(null);
    try {
      const description = await generateDescription(task.title);
      setResult({ type: 'description', value: description });
      onUpdateTask({ ...task, description });
    } catch {
      setError('Failed to generate description. Try again.');
    }
    setLoading(null);
  };

  const PRIORITY_COLORS = {
    high:   { color: '#ef4444', bg: '#fef2f2' },
    medium: { color: '#f59e0b', bg: '#fffbeb' },
    low:    { color: '#22c55e', bg: '#f0fdf4' },
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.75rem',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
              <div style={{
                width: '24px', height: '24px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="ti ti-sparkles" style={{ fontSize: '12px', color: '#fff' }} />
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>AI Assistant</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Powered by Gemini — working on: <strong style={{ color: '#6366f1' }}>{task.title}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none',
              cursor: 'pointer', color: '#94a3b8', fontSize: '18px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <i className="ti ti-x" />
          </button>
        </div>

        {/* AI Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
          {[
            {
              key: 'breakdown',
              icon: 'ti-list-check',
              label: 'Break into subtasks',
              desc: 'Generate 3-5 actionable subtasks',
              onClick: handleBreakdown,
              color: '#6366f1',
              bg: '#eef2ff',
            },
            {
              key: 'priority',
              icon: 'ti-flag',
              label: 'Suggest priority',
              desc: 'AI picks high, medium, or low',
              onClick: handlePriority,
              color: '#f59e0b',
              bg: '#fffbeb',
            },
            {
              key: 'description',
              icon: 'ti-writing',
              label: 'Generate description',
              desc: 'Write a clear task description',
              onClick: handleDescription,
              color: '#22c55e',
              bg: '#f0fdf4',
            },
          ].map(({ key, icon, label, desc, onClick, color, bg }) => (
            <button
              key={key}
              onClick={onClick}
              disabled={loading !== null}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                padding: '0.875rem 1rem',
                background: loading === key ? bg : '#f8fafc',
                border: `1px solid ${loading === key ? color + '33' : '#f1f5f9'}`,
                borderRadius: '8px',
                cursor: loading !== null ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
                textAlign: 'left',
                opacity: loading !== null && loading !== key ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = bg;
                  e.currentTarget.style.borderColor = color + '33';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#f1f5f9';
                }
              }}
            >
              <div style={{
                width: '34px', height: '34px',
                borderRadius: '8px',
                background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {loading === key ? (
                  <i className="ti ti-loader" style={{ fontSize: '16px', color, animation: 'spin 1s linear infinite' }} />
                ) : (
                  <i className={`ti ${icon}`} style={{ fontSize: '16px', color }} />
                )}
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#0f172a' }}>{label}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{desc}</div>
              </div>
              {loading !== key && (
                <i className="ti ti-chevron-right" style={{ fontSize: '14px', color: '#cbd5e1', marginLeft: 'auto' }} />
              )}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '6px', padding: '0.65rem 0.875rem',
            fontSize: '0.78rem', color: '#ef4444', marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {/* Results */}
        {result === 'breakdown' && subtasks.length > 0 && (
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: '8px', padding: '1rem', marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6366f1', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Suggested subtasks
            </div>
            {subtasks.map((subtask, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '8px',
                padding: '0.5rem 0',
                borderBottom: i < subtasks.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#eef2ff', border: '1px solid #c7d2fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 600, color: '#6366f1',
                  flexShrink: 0, marginTop: '1px',
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.5 }}>{subtask}</span>
              </div>
            ))}
            <button
              onClick={() => { onAddSubtasks(subtasks); onClose(); }}
              style={{
                width: '100%', marginTop: '0.875rem',
                padding: '0.55rem',
                background: '#6366f1', border: 'none',
                borderRadius: '6px', color: '#fff',
                fontSize: '0.78rem', fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Add all as tasks
            </button>
          </div>
        )}

        {result?.type === 'priority' && (
          <div style={{
            background: PRIORITY_COLORS[result.value]?.bg,
            border: `1px solid ${PRIORITY_COLORS[result.value]?.color}33`,
            borderRadius: '8px', padding: '0.875rem 1rem',
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '1rem',
          }}>
            <i className="ti ti-circle-check" style={{ fontSize: '16px', color: PRIORITY_COLORS[result.value]?.color }} />
            <span style={{ fontSize: '0.82rem', color: '#374151' }}>
              Priority set to{' '}
              <strong style={{ color: PRIORITY_COLORS[result.value]?.color, textTransform: 'capitalize' }}>
                {result.value}
              </strong>
            </span>
          </div>
        )}

        {result?.type === 'description' && (
          <div style={{
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '8px', padding: '0.875rem 1rem',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#22c55e', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Generated description
            </div>
            <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.6 }}>{result.value}</p>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '0.6rem',
            background: 'transparent', border: '1px solid #e2e8f0',
            borderRadius: '7px', color: '#64748b',
            fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
