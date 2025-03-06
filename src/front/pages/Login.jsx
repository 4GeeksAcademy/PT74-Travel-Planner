import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import './style.css';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Logging in with:", { email, password });

        
    };

	return (
	<div>	
        <form>
            <div className="mb-3">
                <label for="InputEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="InputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="InputPassword"/>
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
}