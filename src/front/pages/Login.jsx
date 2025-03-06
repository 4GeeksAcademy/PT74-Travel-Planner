import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import { Context } from "../hooks/useGlobalReducer";

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { store, dispatch } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            dispatch({ type: 'set_auth_token', payload: data.token });
            navigate('/');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>

                <div className="text-center mt-3">
                <p>Don't have an account?</p>
                <Link to="/register">
                    <button type="button" className="btn btn-outline-secondary">Register an Account</button>
                </Link>
            </div>
            </form>
        </div>
    );
};