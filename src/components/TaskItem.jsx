import React from 'react';

function formatDate(dt) {
    if (!dt) return '';
    return new Date(dt).toLocaleString();
}

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
    const { title, description, tags, due, priority, completed } = task;
    return (
        <div className="card">
            <div>
                <input type="checkbox" checked={completed} onChange={onToggleComplete} style={{ marginRight: 8 }} />
                <span className={completed ? 'task-completed' : ''}><strong>{title}</strong></span>
            </div>
            {description && (
                <div style={{ margin: '8px 0' }}>{description}</div>
            )}
            <div className="task-meta">
                {due && <>Due: <span>{formatDate(due)}</span> | </>}<span className={'priority-' + priority.toLowerCase()}>Priority: {priority}</span>
                {tags && tags.length > 0 && <span> | Tags: {tags.map(tag => (<span key={tag} className="tag">{tag}</span>))}</span>}{' '}</span>}
            </div>
            <div style={{ marginTop: '10px' }}>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}