import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AIPanel from './AIPanel';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: '#6366f1', bg: '#eef2ff' },
  { id: 'inprogress', label: 'In Progress', color: '#f59e0b', bg: '#fffbeb' },
  { id: 'done', label: 'Done', color: '#22c55e', bg: '#f0fdf4' },
];

const PRIORITY = {
  high:   { label: 'High',   color: '#ef4444', bg: '#fef2f2', dot: '#ef4444' },
  medium: { label: 'Medium', color: '#f59e0b', bg: '#fffbeb', dot: '#f59e0b' },
  low:    { label: 'Low',    color: '#22c55e', bg: '#f0fdf4', dot: '#22c55e' },
};

function TaskCard({ task, onMove, onDelete, onAI }) {
  const [hovered, setHovered] = useState(false);
  const p = PRIORITY[task.priority] || PRIORITY.medium;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: `1px solid ${hovered ? '#e2e8f0' : '#f1f5f9'}`,
        borderRadius: '8px',
        padding: '0.875rem',
        marginBottom: '6px',
        cursor: 'grab',
        transition: 'all 0.15s',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {/* Priority */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.65rem',
        fontWeight: 500,
        color: p.color,
        background: p.bg,
        padding: '2px 7px',
        borderRadius: '99px',
        marginBottom: '0.5rem',
      }}>
        <span style={{
          width: '5px', height: '5px',
          borderRadius: '50%',
          background: p.dot,
          display: 'inline-block',
        }} />
        {p.label}
      </div>

      {/* Title */}
      <div style={{
        fontSize: '0.82rem',
        fontWeight: 500,
        color: '#0f172a',
        lineHeight: 1.5,
        marginBottom: hovered ? '0.75rem' : '0',
      }}>
        {task.title}
      </div>

      {/* Description */}
      {task.description && (
        <div style={{
          fontSize: '0.72rem',
          color: '#94a3b8',
          lineHeight: 1.5,
          marginBottom: hovered ? '0.75rem' : '0.25rem',
        }}>
          {task.description}
        </div>
      )}

      {/* Actions on hover */}
      {hovered && (
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
          {COLUMNS.filter(c => c.id !== task.column).map(col => (
            <button
              key={col.id}
              onClick={() => onMove(task.id, col.id)}
              style={{
                fontSize: '0.65rem',
                fontWeight: 500,
                padding: '3px 8px',
                background: col.bg,
                border: 'none',
                borderRadius: '99px',
                color: col.color,
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              → {col.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
            <button
              onClick={() => onAI(task)}
              style={{
                fontSize: '0.65rem', fontWeight: 500,
                padding: '3px 8px', background: '#eef2ff',
                border: 'none', borderRadius: '99px',
                color: '#6366f1', cursor: 'pointer',
              }}
            >
              ✦ AI
            </button>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                fontSize: '0.65rem', fontWeight: 500,
                padding: '3px 8px', background: '#fef2f2',
                border: 'none', borderRadius: '99px',
                color: '#ef4444', cursor: 'pointer',
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
          maxWidth: '420px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '1.25rem' }}>
          Add new task
        </h3>

        {/* Title */}
        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Title *
          </label>
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') onClose(); }}
            style={{
              width: '100%',
              padding: '0.6rem 0.875rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '7px',
              fontSize: '0.85rem',
              color: '#0f172a',
              outline: 'none',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '0.875rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={2}
            style={{
              width: '100%',
              padding: '0.6rem 0.875rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '7px',
              fontSize: '0.85rem',
              color: '#0f172a',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#6366f1'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
          />
        </div>

        {/* Priority */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Priority
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['low', 'medium', 'high'].map((p) => {
              const config = PRIORITY[p];
              const isSelected = priority === p;
              return (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    border: `1px solid ${isSelected ? config.color : '#e2e8f0'}`,
                    borderRadius: '6px',
                    background: isSelected ? config.bg : 'transparent',
                    color: isSelected ? config.color : '#94a3b8',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textTransform: 'capitalize',
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.6rem',
              background: 'transparent',
              border: '1px solid #e2e8f0',
              borderRadius: '7px',
              color: '#64748b',
              fontSize: '0.82rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            style={{
              flex: 2,
              padding: '0.6rem',
              background: '#6366f1',
              border: 'none',
              borderRadius: '7px',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
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
      flex: 1,
      minWidth: '272px',
      background: '#f8fafc',
      border: '1px solid #f1f5f9',
      borderRadius: '10px',
      padding: '0.875rem',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.875rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: column.color }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>{column.label}</span>
        </div>
        <span style={{
          fontSize: '0.68rem', fontWeight: 600,
          color: column.color, background: column.bg,
          padding: '1px 7px', borderRadius: '99px',
        }}>
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div style={{ minHeight: '80px' }}>
        {tasks.length === 0 ? (
          <div style={{
            fontSize: '0.72rem', color: '#cbd5e1',
            textAlign: 'center', padding: '1.5rem 0',
            border: '1.5px dashed #e2e8f0', borderRadius: '8px',
          }}>
            No tasks
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} onAI={onAI} />
          ))
        )}
      </div>

      {/* Add task */}
      <button
        onClick={() => onAddTask(column.id)}
        style={{
          width: '100%', marginTop: '6px', padding: '0.55rem',
          background: 'transparent', border: '1px dashed #e2e8f0',
          borderRadius: '7px', color: '#94a3b8',
          fontSize: '0.72rem', fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '5px', transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#6366f1';
          e.currentTarget.style.color = '#6366f1';
          e.currentTarget.style.background = '#eef2ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.color = '#94a3b8';
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <i className="ti ti-plus" style={{ fontSize: '13px' }} />
        Add task
      </button>
    </div>
  );
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [aiTask, setAiTask] = useState(null);

  // Load tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });
      if (!error) setTasks(data || []);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const addTask = async ({ title, description, priority, column }) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, priority, column, user_id: user.id }])
      .select()
      .single();
    if (!error && data) setTasks(prev => [...prev, data]);
  };

  const moveTask = async (taskId, newColumn) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, column: newColumn } : t));
    await supabase.from('tasks').update({ column: newColumn }).eq('id', taskId);
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
      title, description: '', priority: 'medium',
      column: 'todo', user_id: user.id,
    }));
    const { data, error } = await supabase.from('tasks').insert(newTasks).select();
    if (!error && data) setTasks(prev => [...prev, ...data]);
  };

  const deleteTask = async (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await supabase.from('tasks').delete().eq('id', taskId);
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.85rem' }}>
      Loading tasks...
    </div>
  );

  return (
    <>
      <div style={{
        display: 'flex', gap: '12px',
        alignItems: 'flex-start',
        overflowX: 'auto', paddingBottom: '1rem',
      }}>
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
        <AIPanel
          task={aiTask}
          onAddSubtasks={addSubtasks}
          onUpdateTask={updateTask}
          onClose={() => setAiTask(null)}
        />
      )}
    </>
  );
}
