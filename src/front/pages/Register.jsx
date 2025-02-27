import React, { useEffect , useState } from "react"
import './style.css';

export const Register = () => {

    const [post, setPost] = useState({ firstName:'', lastName:'', email:'', password:''});

    const handleChange = (e) => {
        setPost({ ...post, [e.target.id]: e.target.value });
    };

    const handleSubmit = () => {
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/user", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
          })
        .catch(error => {
            console.error('Error:', error);
        });
          
    };

	return (
	<div>	
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
                <label for="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" onChange={handleChange} aria-describedby="firstNameHelp"/>
            </div>
            <div className="mb-3">
                <label for="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" onChange={handleChange} aria-describedby="lastNameHelp"/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" onChange={handleChange} aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
	);
}