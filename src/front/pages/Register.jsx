import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import './style.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const { firstname, lastname, email, password } = formData;
        if (![firstname, lastname, email, password].every(Boolean)) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem("authToken", data.token);
                dispatch({ type: "set_auth_token", payload: data.token });
                navigate("/");
            } else {
                setError(data.message || data.error || "Registration failed.");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setError("Something went wrong.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstname" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastname" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
};



