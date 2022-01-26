import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: '', email: '', password: '', confirmpassword: '' });
  const host = "http://localhost:5000";

  const handleSubmit = async (event) => {
    event.preventDefault();

    // destructuring from the credentials
    const { name, email, password } = credentials;

    // i can also use context api for this function 
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      // redirect the user
      localStorage.setItem('token', json.authToken)
      navigate('/');

    } else {
      alert('invalid credentials');
    }
  }

  const handleChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={handleChange} aria-describedby="emailHelp" minLength={3} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' value={credentials.confirmpassword} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
  </div>;
};

export default Signup;
