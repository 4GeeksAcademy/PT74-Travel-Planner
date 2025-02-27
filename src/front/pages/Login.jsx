import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import './style.css';

export const Login = () => {
	return (
	<div>	
        <form>
            <div class="mb-3">
                <label for="InputEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="InputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="InputPassword"/>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>

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