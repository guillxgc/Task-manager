import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const newTask = { title, description, completed: false };

        try {
            const res = await axios.post('http://localhost:4000/api/tasks', newTask);
            onTaskAdded(res.data);
            
            setTitle('');
            setDescription('');
            setCompleted(false);
        } catch (error) {
            console.error("Error adding task", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='task-form'>
            <h2>Add a New Task</h2>
            <input 
                type='text'
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder='Title'
                required
            />
            <input
                type='text'
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder='Description'
                required
            />

            <button type='submit'>Add Task</button>
        </form>
    );
};

export default TaskForm;
