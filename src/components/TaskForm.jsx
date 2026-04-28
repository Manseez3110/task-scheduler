import React, { useState } from 'react';
const priorities = ['High', 'Medium', 'Low'];
export default function TaskForm({ onSubmit, initial = null, onCancel }) {
 const [title, setTitle] = useState(initial?.title || '');
 const [description, setDescription] = useState(initial?.description || '');
 const [due, setDue] = useState(initial?.due || '');
 const [priority, setPriority] = useState(initial?.priority || 'Medium');
 const [tags, setTags] = useState(initial?.tags?.join(', ') || '');

 function handleSubmit(e) {
 e.preventDefault();
 if (!title.trim()) return;
 onSubmit({ title, description, due, priority, tags: tags.split(',').map(t => t.trim()).filter(Boolean) });
 if (!initial) {
 setTitle('');
 setDescription('');
 setDue('');
 setPriority('Medium');
 setTags('');
 }
 if (onCancel) onCancel();
 }

 return (
 <form onSubmit={handleSubmit}>
 <input type="text" placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} required />
 <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
 <input type="datetime-local" value={due} onChange={e => setDue(e.target.value)} />
 <select value={priority} onChange={e => setPriority(e.target.value)}>{priorities.map(p => (<option key={p} value={p}>{p}</option>))}</select>
 <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
 <button type="submit">{initial ? 'Update Task' : 'Add Task'}</button>
 {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
 </form>
 );
}