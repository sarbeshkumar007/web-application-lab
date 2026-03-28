import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));

  const toggleDone = (id) =>
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const startEdit = (todo) => { setEditId(todo.id); setEditText(todo.text); };

  const saveEdit = () => {
    setTodos(todos.map(t => t.id === editId ? { ...t, text: editText } : t));
    setEditId(null); setEditText("");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <h1 style={{ textAlign: "center", color: "#1f2937", marginBottom: "30px" }}>📝 My Todo List</h1>

        {/* Add Todo */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..." style={inputStyle} />
          <button onClick={addTodo} style={addBtnStyle}>Add</button>
        </div>

        {/* Todo List */}
        {todos.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af" }}>No tasks yet. Add one above!</p>
        )}

        {todos.map(todo => (
          <div key={todo.id} style={cardStyle}>
            {editId === todo.id ? (
              <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                <input value={editText} onChange={e => setEditText(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <button onClick={saveEdit} style={saveBtnStyle}>Save</button>
              </div>
            ) : (
              <>
                <span onClick={() => toggleDone(todo.id)} style={{
                  flex: 1, cursor: "pointer", fontSize: "15px",
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done ? "#9ca3af" : "#1f2937"
                }}>
                  {todo.done ? "✅ " : "⬜ "}{todo.text}
                </span>
                <button onClick={() => startEdit(todo)} style={editBtnStyle}>✏️</button>
                <button onClick={() => deleteTodo(todo.id)} style={delBtnStyle}>🗑️</button>
              </>
            )}
          </div>
        ))}

        <p style={{ textAlign: "center", color: "#6b7280", marginTop: "20px", fontSize: "13px" }}>
          {todos.filter(t => t.done).length}/{todos.length} tasks completed
        </p>
      </div>
    </div>
  );
}

const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", width: "100%", boxSizing: "border-box" };
const addBtnStyle = { padding: "10px 20px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", whiteSpace: "nowrap" };
const cardStyle = { backgroundColor: "white", padding: "12px 16px", borderRadius: "8px", marginBottom: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "10px" };
const editBtnStyle = { background: "none", border: "none", cursor: "pointer", fontSize: "16px" };
const delBtnStyle = { background: "none", border: "none", cursor: "pointer", fontSize: "16px" };
const saveBtnStyle = { padding: "8px 14px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" };

export default App;