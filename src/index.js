import { useState, useEffect } from "react";

function TodoApp() {
  // state for todos and new input value
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // load todos from localStorage when the app first mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // add new todo
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Todo App</h1>

      {/* input + button */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={addTodo}>Add</button>

      {/* todo list */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
