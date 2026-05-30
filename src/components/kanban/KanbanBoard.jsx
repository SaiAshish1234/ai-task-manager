import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import AIPanel from './AIPanel';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: '#a5b4fc', glow: 'rgba(99,102,241,0.5)', bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.25)' },
  { id: 'inprogress', label: 'In Progress', color: '#fcd34d', glow: 'rgba(251,191,36,0.5)', bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.25)' },
  { id: 'done', label: 'Done', color: '#6ee7b7', glow: 'rgba(34,211,153,0.5)', bg: 'rgba(34,211,153,0.15)', border: 'rgba(34,211,153,0.25)' },
];

const PRIORITY = {
  high:   { label: 'High',   color: '#fca5a5', bg: 'rgba(239,68,68,0.15)',   dot: '#ef4444' },
  medium: { label: 'Medium', color: '#fcd34d', bg: 'rgba(251,191,36,0.15)',  dot: '#f59e0b' },
  low:    { label: 'Low',    color: '#6ee7b7', bg: 'rgba(34,211,153,0.15)', dot: '#22c55e' },
};

function TaskCard({ task, onMove, onDelete, onAI }) {
  const [hovered, setHovered] = useState(false);
  const p = PRIORITY[task.priority] || PRIORITY.medium;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '10px',
        padding: '0.75rem 0.875rem',
        marginBottom: '7px',
        cursor: 'grab',
        transition: 'all 0.2s',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        fontSize: '0.6rem', fontWeight: 600,
        color: p.color, background: p.bg,
        padding: '2px 8px', borderRadius: '99px', marginBottom: '0.5rem',
      }}>
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: p.dot, display: 'inline-block', boxShadow: `0 0 4px ${p.dot}` }} />
        {p.label}
      </div>

      <div style={{
        fontSize: '0.78rem', fontWeight: 500,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.5,
        marginBottom: hovered ? '0.75rem' : '0',
      }}>
        {task.title}
      </div>

      {task.description && (
        <div style={{
          fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)',
          lineHeight: 1.5, marginBottom: hovered ? '0.75rem' : '0.25rem',
        }}>
          {task.description}
        </div>
      )}

      {hovered && (
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
          {COLUMNS.filter(c => c.id !== task.column).map(col => (
            <button
              key={col.id}
              onClick={() => onMove(task.id, col.id)}
              style={{
                fontSize: '0.62rem', fontWeight: 500,
                padding: '2px 8px',
                background: col.bg,
                border: `1px solid ${col.border}`,
                borderRadius: '99px',
                color: col.color,
                cursor: 'pointer', transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              → {col.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
            <button
              onClick={() => onAI(task)}
              style={{
                fontSize: '0.62rem', fontWeight: 600,
                padding: '2px 8px',
                background: 'rgba(99,102,241,0.2)',
                border: '1px solid rgba(99,102,241,0.4)',
                borderRadius: '99px', color: '#a5b4fc',
                cursor: 'pointer',
                boxShadow: '0 0 8px rgba(99,102,241,0.3)',
              }}
            >
              ✦ AI
            </button>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                fontSize: '0.62rem', fontWeight: 500,
                padding: '2px 8px',
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '99px', color: '#fca5a5',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddTaskModal({ columnId, onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim(), priority, column: columnId });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'rgba(20,20,30,0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        padding: '1.75rem',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
          Add new task
        </h3>

        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Title *
          </label>
          <input
            autoFocus type="text" value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') onClose(); }}
            style={{
              width: '100%', padding: '0.65rem 0.875rem',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', fontSize: '0.85rem',
              color: '#fff', outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
        </div>

        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Description
          </label>
          <textarea
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..." rows={2}
            style={{
              width: '100%', padding: '0.65rem 0.875rem',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', fontSize: '0.82rem',
              color: '#fff', outline: 'none', resize: 'vertical',
              fontFamily: 'Inter, sans-serif', transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Priority
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['low', 'medium', 'high'].map((p) => {
              const config = PRIORITY[p];
              const isSelected = priority === p;
              return (
                <button key={p} onClick={() => setPriority(p)} style={{
                  flex: 1, padding: '0.4rem',
                  border: `1px solid ${isSelected ? config.dot : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '7px',
                  background: isSelected ? config.bg : 'transparent',
                  color: isSelected ? config.color : 'rgba(255,255,255,0.3)',
                  fontSize: '0.72rem', fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.15s', textTransform: 'capitalize',
                  boxShadow: isSelected ? `0 0 10px ${config.bg}` : 'none',
                }}>
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '0.65rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', color: 'rgba(255,255,255,0.5)',
            fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleAdd} style={{
            flex: 2, padding: '0.65rem',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none', borderRadius: '8px',
            color: '#fff', fontSize: '0.82rem', fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
          }}>
            Add task
          </button>
        </div>
      </div>
    </div>
  );
}

function Column({ column, tasks, onMove, onDelete, onAddTask, onAI }) {
  return (
    <div style={{
      flex: 1, minWidth: '272px',
      background: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px', padding: '0.875rem',
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: column.color, boxShadow: `0 0 8px ${column.glow}` }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{column.label}</span>
        </div>
        <span style={{ fontSize: '0.62rem', fontWeight: 600, color: column.color, background: column.bg, border: `1px solid ${column.border}`, padding: '1px 8px', borderRadius: '99px', boxShadow: `0 0 8px ${column.bg}` }}>
          {tasks.length}
        </span>
      </div>

      <div style={{ minHeight: '80px' }}>
        {tasks.length === 0 ? (
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.15)', textAlign: 'center', padding: '1.5rem 0', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '8px' }}>
            No tasks
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} onAI={onAI} />
          ))
        )}
      </div>

      <button
        onClick={() => onAddTask(column.id)}
        style={{
          width: '100%', marginTop: '6px', padding: '0.5rem',
          background: 'transparent', border: '1px dashed rgba(255,255,255,0.08)',
          borderRadius: '8px', color: 'rgba(255,255,255,0.2)',
          fontSize: '0.7rem', fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '5px', transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
          e.currentTarget.style.color = '#a5b4fc';
          e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.2)';
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <i className="ti ti-plus" style={{ fontSize: '13px' }} />
        Add task
      </button>
    </div>
  );
}

function DraggableAIPanel({ task, onAddSubtasks, onUpdateTask, onClose }) {
  const [pos, setPos] = useState({ x: window.innerWidth - 340, y: 80 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
  };

  const onMouseUp = () => {
    dragging.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 2000, width: '300px' }}>
      <div
        onMouseDown={onMouseDown}
        style={{
          background: 'rgba(99,102,241,0.15)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderBottom: 'none',
          borderRadius: '14px 14px 0 0',
          padding: '0.4rem 0.875rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'grab', userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="ti ti-grip-horizontal" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>DRAG TO MOVE</span>
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
          <i className="ti ti-x" />
        </button>
      </div>
      <AIPanel task={task} onAddSubtasks={onAddSubtasks} onUpdateTask={onUpdateTask} onClose={onClose} isDraggable />
    </div>
  );
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [aiTask, setAiTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('tasks').select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (!error) setTasks(data || []);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  // ✅ NEW TASK button in header triggers this
  useEffect(() => {
    const handler = () => setModal('todo');
    window.addEventListener('newTask', handler);
    return () => window.removeEventListener('newTask', handler);
  }, []);

  const addTask = async ({ title, description, priority, column }) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('tasks').insert([{ title, description, priority, column, user_id: user.id }])
      .select().single();
    if (!error && data) setTasks(prev => [...prev, data]);
  };

  const moveTask = async (taskId, newColumn) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, column: newColumn } : t));
    await supabase.from('tasks').update({ column: newColumn }).eq('id', taskId);
  };

  const deleteTask = async (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await supabase.from('tasks').delete().eq('id', taskId);
  };

  const updateTask = async (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    await supabase.from('tasks').update({
      priority: updatedTask.priority,
      description: updatedTask.description,
    }).eq('id', updatedTask.id);
  };

  const addSubtasks = async (subtasks) => {
    const { data: { user } } = await supabase.auth.getUser();
    const newTasks = subtasks.map(title => ({
      title, description: '', priority: 'medium', column: 'todo', user_id: user.id,
    }));
    const { data, error } = await supabase.from('tasks').insert(newTasks).select();
    if (!error && data) setTasks(prev => [...prev, ...data]);
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
      Loading tasks...
    </div>
  );

  return (
    <>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: '1rem' }}>
        {COLUMNS.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter(t => t.column === column.id)}
            onMove={moveTask}
            onDelete={deleteTask}
            onAddTask={(colId) => setModal(colId)}
            onAI={(task) => setAiTask(task)}
          />
        ))}
      </div>

      {modal && (
        <AddTaskModal
          columnId={modal}
          onAdd={addTask}
          onClose={() => setModal(null)}
        />
      )}

      {aiTask && (
        <DraggableAIPanel
          task={aiTask}
          onAddSubtasks={addSubtasks}
          onUpdateTask={updateTask}
          onClose={() => setAiTask(null)}
        />
      )}
      {/* Bottom stats bar */}
<div style={{
  marginTop: '2rem',
  padding: '1rem 1.25rem',
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '12px',
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
}}>
  {[
    { label: 'Total', value: tasks.length, color: '#a5b4fc' },
    { label: 'In Progress', value: tasks.filter(t => t.column === 'inprogress').length, color: '#fcd34d' },
    { label: 'Done', value: tasks.filter(t => t.column === 'done').length, color: '#6ee7b7' },
    { label: 'High Priority', value: tasks.filter(t => t.priority === 'high').length, color: '#fca5a5' },
  ].map(({ label, value, color }) => (
    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ fontSize: '1.1rem', fontWeight: 700, color, filter: `drop-shadow(0 0 6px ${color})`, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  ))}
  <div style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>
    {tasks.filter(t => t.column === 'done').length} of {tasks.length} tasks completed
  </div>
</div>
    </>
  );
}