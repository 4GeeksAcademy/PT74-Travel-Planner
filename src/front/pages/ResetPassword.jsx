import React, { useState } from "react";

export const ResetPassword = () => {
    const [form, setForm] = useState({
        email: "",
        security_question: "",
        security_answer: "",
        new_password: ""
    });

    const [questionFetched, setQuestionFetched] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/get-security-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email })
            });

            const data = await response.json();
            if (response.ok) {
                setForm({ ...form, security_question: data.security_question });
                setQuestionFetched(true);
            } else {
                setError(data.error || "Could not fetch security question.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
        }
    };

    const handleResetSubmit = async (e) => {
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
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Reset Password</h2>

            {!questionFetched ? (
                <form onSubmit={handleEmailSubmit}>
                    <input
                        name="email"
                        className="form-control mb-3"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn btn-primary">Continue</button>
                </form>
            ) : (
                <form onSubmit={handleResetSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Security Question</label>
                        <input
                            className="form-control"
                            name="security_question"
                            value={form.security_question}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Your Answer</label>
                        <input
                            name="security_answer"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            name="new_password"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Reset Password</button>
                </form>
            )}

            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

