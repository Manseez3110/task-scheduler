import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
    const [editingId, setEditingId] = useState(null);

    return (
        <div>
            {tasks.length === 0 && <div className="card">No tasks yet.</div>}
            {tasks.map(task => editingId === task.id ? (
                <div className="card" key={task.id}> 
                    <TaskForm 
                        initial={task} 
                        onSubmit={fields => { onEdit(task.id, fields); setEditingId(null); }} 
                        onCancel={() => setEditingId(null)} 
                    />
                </div>
            ) : (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onEdit={() => setEditingId(task.id)} 
                    onDelete={() => onDelete(task.id)} 
                    onToggleComplete={() => onToggleComplete(task.id)} 
                />
            ))}
        </div>
    );
}