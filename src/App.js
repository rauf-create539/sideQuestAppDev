import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load todos from memory on component mount
  useEffect(() => {
    // Initialize with some sample todos for demonstration
    const initialTodos = [
      
    ];
    setTodos(initialTodos);
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <h1 className="app-title">My Todo List</h1>
        
        {/* Add new todo */}
        <div className="add-todo-section">
          <div className="input-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, addTodo)}
              placeholder="Add a new todo..."
              className="todo-input"
            />
            <button
              onClick={addTodo}
              className="add-button"
            >
              Add
            </button>
          </div>
        </div>

        {/* Todo list */}
        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              No todos yet. Add one above!
            </div>
          ) : (
            <div>
              {todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className="todo-item"
                >
                  <div className="todo-content">
                    {/* Todo text */}
                    <div className="todo-text-container">
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                          className="edit-input"
                          autoFocus
                        />
                      ) : (
                        <span className="todo-text">
                          {todo.text}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="button-group">
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="action-button save-button"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="action-button cancel-button"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(todo.id, todo.text)}
                            className="action-button edit-button"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="action-button delete-button"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;