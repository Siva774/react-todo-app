import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTaskCompletion, editTask, setTasks } from '../redux/tasksReducer';
import './TaskList.css';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch(setTasks(savedTasks));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id) => {
    dispatch(removeTask(id));
  };

  const handleToggleCompletion = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleEditTask = (id) => {
    setIsEditing(true);
    setEditIndex(id);
    setCurrentTask(tasks[id].text);
  };

  const handleSaveEdit = () => {
    dispatch(editTask({ index: editIndex, newText: currentTask }));
    setIsEditing(false);
    setCurrentTask('');
    setEditIndex(null);
  };

  return (
    <div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => handleToggleCompletion(index)}>{task.text}</span>
            <button onClick={() => handleEditTask(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {isEditing && (
        <div className="edit-popup">
          <input
            type="text"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
