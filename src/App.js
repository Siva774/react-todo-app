import React, { useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      const newTask = {name: taskName, completed: false };
      setTasks([...tasks, newTask]);
      setTaskName(""); 
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app">
      <h1 className="heading">Task Tracker</h1>
    
    <div className="text-and-taskbutton">
      <form onSubmit={addTask}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter new task" className="input-box"
        />
        <button type="submit">Add Task</button>
      </form>
      </div>

     
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            <span>{task.name}</span>
            <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}><i class="fa fa-trash"></i></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
