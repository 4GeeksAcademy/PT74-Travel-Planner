import React, { useState } from "react";

export const ResetPassword = () => {
    const [form, setForm] = useState({
        email: "",
        security_question: "",
        security_answer: "",
        new_password: ""
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Password has been reset. You can now login.");
            } else {
                setError(data.error || "Reset failed.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="security_question" placeholder="Security Question" onChange={handleChange} required />
                <input name="security_answer" placeholder="Security Answer" onChange={handleChange} required />
                <input name="new_password" type="password" placeholder="New Password" onChange={handleChange} required />
                <button type="submit">Reset</button>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
            </form>
        </div>
    );
};
