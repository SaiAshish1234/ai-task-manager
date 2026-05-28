import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('tasks').select('*')
        .eq('user_id', user.id);
      if (!error) setTasks(data || []);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const total = tasks.length;
  const done = tasks.filter(t => t.column === 'done').length;
  const inProgress = tasks.filter(t => t.column === 'inprogress').length;
  const todo = tasks.filter(t => t.column === 'todo').length;
  const high = tasks.filter(t => t.priority === 'high').length;
  const medium = tasks.filter(t => t.priority === 'medium').length;
  const low = tasks.filter(t => t.priority === 'low').length;

  const columnData = [
    { name: 'To Do', value: todo, color: '#a5b4fc' },
    { name: 'In Progress', value: inProgress, color: '#fcd34d' },
    { name: 'Done', value: done, color: '#6ee7b7' },
  ];

  const priorityData = [
    { name: 'High', value: high, color: '#fca5a5' },
    { name: 'Medium', value: medium, color: '#fcd34d' },
    { name: 'Low', value: low, color: '#6ee7b7' },
  ];

  const STATS = [
    { label: 'Total Tasks', value: total, icon: 'ti-clipboard-list', color: '#a5b4fc', glow: 'rgba(99,102,241,0.3)', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' },
    { label: 'Completed', value: done, icon: 'ti-circle-check', color: '#6ee7b7', glow: 'rgba(34,211,153,0.3)', bg: 'rgba(34,211,153,0.1)', border: 'rgba(34,211,153,0.2)' },
    { label: 'In Progress', value: inProgress, icon: 'ti-loader', color: '#fcd34d', glow: 'rgba(251,191,36,0.3)', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
    { label: 'To Do', value: todo, icon: 'ti-circle-dashed', color: '#fca5a5', glow: 'rgba(239,68,68,0.3)', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(12,12,20,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px', padding: '0.6rem 0.875rem',
        }}>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: '2px' }}>{label}</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: payload[0].fill }}>{payload[0].value} tasks</div>
        </div>
      );
    }
    return null;
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
      Loading dashboard...
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
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
            borderRadius: '12px', padding: '1.25rem',
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
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <i className={`ti ${icon}`} style={{ fontSize: '18px', color, filter: `drop-shadow(0 0 6px ${glow})` }} />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.25rem' }}>
                {label}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color, letterSpacing: '-0.03em', lineHeight: 1, filter: `drop-shadow(0 0 8px ${glow})` }}>
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      {total === 0 ? (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px', padding: '3rem 2rem', textAlign: 'center',
        }}>
          <div style={{ width: '44px', height: '44px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.875rem' }}>
            <i className="ti ti-chart-bar" style={{ fontSize: '22px', color: '#a5b4fc' }} />
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>No data yet</div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>Add some tasks to your board to see analytics here</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {/* Tasks by column */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px', padding: '1.5rem',
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
              Tasks by Status
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={columnData} barSize={32}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {columnData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tasks by priority */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px', padding: '1.5rem',
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
              Tasks by Priority
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={priorityData} barSize={32}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {priorityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completion rate */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px', padding: '1.5rem',
            gridColumn: '1 / -1',
            display: 'flex', alignItems: 'center', gap: '2rem',
          }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>
                Completion Rate
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#6ee7b7', letterSpacing: '-0.04em', lineHeight: 1, filter: 'drop-shadow(0 0 12px rgba(34,211,153,0.4))' }}>
                {total > 0 ? Math.round((done / total) * 100) : 0}%
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.25rem' }}>
                {done} of {total} tasks completed
              </div>
            </div>
            <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.07)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${total > 0 ? (done / total) * 100 : 0}%`,
                background: 'linear-gradient(90deg, #6366f1, #6ee7b7)',
                borderRadius: '99px',
                transition: 'width 1s ease',
                boxShadow: '0 0 12px rgba(34,211,153,0.4)',
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}