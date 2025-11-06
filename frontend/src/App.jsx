import React, { useState } from "react";

function App() {
  const [page, setPage] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      page === "signup"
        ? "http://localhost:4001/api/auth/signup"
        : "http://localhost:4001/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setMessage("✅ Logged in successfully!");
      } else {
        setMessage("❌ " + (data.message || "Login/Signup failed"));
      }
    } catch (err) {
      setMessage("❌ Server error: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMessage("");
  };

  if (token) {
    return (
      <div style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h2>🎉 Welcome to SlotSwap</h2>
        <p>You're logged in!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>{page === "signup" ? "Create Account" : "Login"}</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        {page === "signup" && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: 10 }}>
          {page === "signup" ? "Sign Up" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        {page === "signup" ? (
          <>
            Already have an account?{" "}
            <button onClick={() => setPage("login")}>Login</button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button onClick={() => setPage("signup")}>Sign Up</button>
          </>
        )}
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
