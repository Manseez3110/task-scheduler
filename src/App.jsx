import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';

const TASKS_KEY = 'tasks';

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(TASKS_KEY);
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskData) => {
        setTasks([...tasks, { id: Date.now(), completed: false, ...taskData }]);
    };

    const updateTask = (id, updatedFields) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedFields } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div>
            <h1>📋 Task Scheduler</h1>
            <div className="card">
                <TaskForm onSubmit={addTask} />
            </div>
            <TaskList tasks={tasks} onEdit={updateTask} onDelete={deleteTask} onToggleComplete={(id) => updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed })} />
        </div>
    );
}

export default App;