import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);

    fetch(`${API_URL}/api/todos`);

    const data = await res.json();
    setTodos(data);
    setLoading(false);
  }

  async function addTodo(e) {
    e?.preventDefault();
    if (!title.trim()) return;
    const res = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim() }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  }

  async function toggleCompleted(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const res = await fetch(`${API_URL}/api/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !todo.completed }),
    });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/api/todos?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  if (!session) {
    return (
      <div style={{ maxWidth: 720, margin: "2rem auto", padding: "1rem" }}>
        <h1>Please sign in</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: "1rem" }}>
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>

      <h1>Simple To-Do</h1>

      <form onSubmit={addTodo} style={{ marginBottom: "1rem" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
        >
          Add
        </button>
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {todos.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <label
                style={{
                  flex: 1,
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleCompleted(t.id)}
                />{" "}
                {t.content}
              </label>

              <button
                onClick={() => deleteTodo(t.id)}
                style={{ marginLeft: 8 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
