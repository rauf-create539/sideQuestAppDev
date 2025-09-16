import React, { useState, useEffect } from 'react';
import './App.css';

// TaskItem component that receives props
function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        
        <div className="task-text-container">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="edit-input"
              autoFocus
            />
          ) : (
            <span className={task.completed ? "task-text completed" : "task-text"}>
              {task.text}
            </span>
          )}
        </div>

        <div className="button-group">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="action-button save-button"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="action-button cancel-button"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="action-button edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="action-button delete-button"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <h1 className="app-title">To-Do Task</h1>
        
        {/* Add new task */}
        <div className="add-task-section">
          <div className="input-container">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="task-input"
            />
            <button
              onClick={addTask}
              className="add-button"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task list using .map() */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              No tasks yet. Add one above!
            </div>
          ) : (
            <div>
              {tasks.map((task) => (
                <TaskItem 
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onEdit={editTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;