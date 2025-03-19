import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import './style.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        security_question: '',
        security_answer: ''
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

        const { firstname, lastname, email, password, security_question, security_answer } = formData;
        if (![firstname, lastname, email, password, security_question, security_answer].every(Boolean)) {
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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create an Account</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" name="firstname" onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="lastname" onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Security Question</label>
                    <select
                        className="form-select"
                        name="security_question"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a question</option>
                        <option value="What is your mother’s maiden name?">What is your mother’s maiden name?</option>
                        <option value="What city were you born in?">What city were you born in?</option>
                        <option value="What is your high school mascot?">What is your high school mascot?</option>
                        <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                        <option value="What was your first car?">What was your first car?</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Security Answer</label>
                    <input
                        type="text"
                        className="form-control"
                        name="security_answer"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Register</button>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
        </div>
    );
};


