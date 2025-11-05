import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

/**
 * Basic single-file React entry for /src/index.js
 * - Creates a root element if none exists (useful for new projects)
 * - Provides a minimal App with basic routes (Home, About, Login, Register)
 * - Uses react-router for client routing
 *
 * Replace or extend the components below with your real app components as needed.
 */

/* Small utility to ensure there's a #root in the document */
function ensureRootElement() {
    let root = document.getElementById("root");
    if (!root) {
        root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);
    }
    return root;
}

/* Example pages - replace with your real components */
function Home() {
    return (
        <main>
            <h1>Welcome</h1>
            <p>This is the home page. Replace this with your real home component.</p>
        </main>
    );
}

function About() {
    return (
        <main>
            <h1>About</h1>
            <p>Project 3 - Group 8 frontend starter page.</p>
        </main>
    );
}

function Login() {
    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Email
                    <input type="email" name="email" required />
                </label>
                <br />
                <label>
                    Password
                    <input type="password" name="password" required />
                </label>
                <br />
                <button type="submit">Log in</button>
            </form>
        </main>
    );
}

function Register() {
    return (
        <main>
            <h1>Register</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Name
                    <input name="name" required />
                </label>
                <br />
                <label>
                    Email
                    <input type="email" name="email" required />
                </label>
                <br />
                <label>
                    Password
                    <input type="password" name="password" required />
                </label>
                <br />
                <button type="submit">Sign up</button>
            </form>
        </main>
    );
}

/* Top-level App with simple navigation */
function App() {
    return (
        <BrowserRouter>
            <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", padding: 16 }}>
                <nav style={{ marginBottom: 16 }}>
                    <Link to="/" style={{ marginRight: 12 }}>Home</Link>
                    <Link to="/about" style={{ marginRight: 12 }}>About</Link>
                    <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
                    <Link to="/register">Register</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Redirect unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

/* Render the app */
const container = ensureRootElement();
const root = createRoot(container);
root.render(<App />);