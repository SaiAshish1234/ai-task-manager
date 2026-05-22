import { useState } from 'react';

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: '#6366f1', bg: '#eef2ff', count_color: '#6366f1' },
  { id: 'inprogress', label: 'In Progress', color: '#f59e0b', bg: '#fffbeb', count_color: '#f59e0b' },
  { id: 'done', label: 'Done', color: '#22c55e', bg: '#f0fdf4', count_color: '#22c55e' },
];

const INITIAL_TASKS = [
  { id: '1', title: 'Set up project structure', column: 'done', priority: 'high' },
  { id: '2', title: 'Build Kanban UI', column: 'inprogress', priority: 'high' },
  { id: '3', title: 'Integrate Supabase auth', column: 'todo', priority: 'medium' },
  { id: '4', title: 'Add AI task breakdown', column: 'todo', priority: 'low' },
];

const PRIORITY = {
  high:   { label: 'High',   color: '#ef4444', bg: '#fef2f2', dot: '#ef4444' },
  medium: { label: 'Medium', color: '#f59e0b', bg: '#fffbeb', dot: '#f59e0b' },
  low:    { label: 'Low',    color: '#22c55e', bg: '#f0fdf4', dot: '#22c55e' },
};

function TaskCard({ task, onMove }) {
  const [hovered, setHovered] = useState(false);
  const p = PRIORITY[task.priority];

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
        boxShadow: hovered
          ? '0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 2px rgba(0,0,0,0.04)',
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

      {/* Move buttons on hover */}
      {hovered && (
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
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
              Move to {col.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Column({ column, tasks, onMove, onAddTask }) {
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
          <div style={{
            width: '7px', height: '7px',
            borderRadius: '50%',
            background: column.color,
          }} />
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#0f172a',
          }}>
            {column.label}
          </span>
        </div>
        <span style={{
          fontSize: '0.68rem',
          fontWeight: 600,
          color: column.color,
          background: column.bg,
          padding: '1px 7px',
          borderRadius: '99px',
        }}>
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div style={{ minHeight: '80px' }}>
        {tasks.length === 0 ? (
          <div style={{
            fontSize: '0.72rem',
            color: '#cbd5e1',
            textAlign: 'center',
            padding: '1.5rem 0',
            border: '1.5px dashed #e2e8f0',
            borderRadius: '8px',
          }}>
            No tasks
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onMove={onMove} />
          ))
        )}
      </div>

      {/* Add task */}
      <button
        onClick={() => onAddTask(column.id)}
        style={{
          width: '100%',
          marginTop: '6px',
          padding: '0.55rem',
          background: 'transparent',
          border: '1px dashed #e2e8f0',
          borderRadius: '7px',
          color: '#94a3b8',
          fontSize: '0.72rem',
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          transition: 'all 0.15s',
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
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const moveTask = (taskId, newColumn) => {
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, column: newColumn } : t)
    );
  };

  const addTask = (columnId) => {
    const title = prompt('Task title:');
    if (!title?.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      column: columnId,
      priority: 'medium',
    };
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      overflowX: 'auto',
      paddingBottom: '1rem',
    }}>
      {COLUMNS.map(column => (
        <Column
          key={column.id}
          column={column}
          tasks={tasks.filter(t => t.column === column.id)}
          onMove={moveTask}
          onAddTask={addTask}
        />
      ))}
    </div>
  );
}