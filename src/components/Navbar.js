import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

/**
 * Simple responsive Navbar component.
 * - Shows different links when user is logged in (based on localStorage 'token' / 'user').
 * - Mobile menu toggle.
 * - Uses semantic markup and aria attributes for accessibility.
 *
 * Place styling in src/components/Navbar.css or style your app's global CSS to match the class names used here.
 */

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Adjust to your auth storage shape (token/user)
        const storedUser = (() => {
            try {
                return JSON.parse(localStorage.getItem("user"));
            } catch {
                return null;
            }
        })();
        const token = localStorage.getItem("token");
        setUser(token ? storedUser || { email: "user" } : null);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    const NavItem = ({ to, children, onClick }) => (
        <li>
            <NavLink
                to={to}
                onClick={() => {
                    setMenuOpen(false);
                    if (onClick) onClick();
                }}
                className={({ isActive }) =>
                    "nav-link" + (isActive ? " nav-link--active" : "")
                }
            >
                {children}
            </NavLink>
        </li>
    );

    return (
        <header className="navbar">
            <div className="navbar__container">
                <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
                    <img
                        src="/logo192.png"
                        alt="Brand"
                        className="navbar__logo"
                        width="36"
                        height="36"
                    />
                    <span className="navbar__title">Project 3</span>
                </Link>

                <button
                    className="navbar__toggle"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen((s) => !s)}
                >
                    <span className="navbar__hamburger" />
                </button>

                <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
                    <ul className="navbar__list">
                        <NavItem to="/">Home</NavItem>
                        <NavItem to="/projects">Projects</NavItem>
                        <NavItem to="/about">About</NavItem>

                        {user ? (
                            <>
                                <NavItem to="/dashboard">Dashboard</NavItem>
                                <li>
                                    <button className="nav-link button--link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <NavItem to="/login">Login</NavItem>
                                <NavItem to="/register">Register</NavItem>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}