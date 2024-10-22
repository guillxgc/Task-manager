import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import '../components/Tasks.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState({ title: '', description: '' });
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/tasks');
                setTasks(res.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEdit = (task) => {
        setEditingTaskId(task._id); /*START EDIT MODE FOR THE SELECTED TASK*/
        setUpdatedTask({ title: task.title, description: task.description });
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/tasks/${id}`, updatedTask); /*SEND UPDATE TO THE SERVER*/
            setTasks(tasks.map(task => (task._id === id ? { ...task, ...updatedTask } : task)));
            setEditingTaskId(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleTaskAdded = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    return (
        <div className='main-container'>
            <div><TaskForm onTaskAdded={handleTaskAdded} /></div>
            <div className='vl'></div>
            <div className='task-list-wrapper'>
                <h2>Task List</h2>
                <div className='task-list'>
                    {tasks.length === 0 ? (
                        <p>No tasks available.</p>
                    ) : (
                        <ul>
                            {tasks.map(task => (
                                <li key={task._id}>
                                    {/*USING CURRENT TASK(?)*/}
                                    {editingTaskId === task._id ? (
                                        <div>
                                            <input 
                                                type="text" 
                                                value={updatedTask.title} 
                                                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })} 
                                            />
                                            <textarea 
                                                value={updatedTask.description} 
                                                onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })} 
                                            />
                                            <button onClick={() => handleUpdate(task._id)}>Save</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>{task.title}</h3>
                                            <p>{task.description}</p>
                                            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>

                                            <button onClick={() => handleEdit(task)}>Modify</button>
                                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
