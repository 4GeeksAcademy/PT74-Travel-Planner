import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import { Context } from "../hooks/useGlobalReducer";

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { dispatch } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem("authToken", data.token);
                dispatch({ type: 'set_auth_token', payload: data.token });
                navigate('/');
            } else {
                setError(data.message || data.error || "Login failed.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} required />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/reset-password" className="text-decoration-none">Forgot Password?</Link>
                </div>

                {error && <div className="alert alert-danger mt-3">{error}</div>}

                <div className="text-center mt-4">
                    <p>Don't have an account?</p>
                    <Link to="/register">
                        <button type="button" className="btn btn-outline-secondary">Register an Account</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
