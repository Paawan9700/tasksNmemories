import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setcredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();

  const host = "http://localhost:5000";

  const handleSubmit = async (event) => {
    event.preventDefault();

    // i can also use context api for this function 
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      // redirect the user
      localStorage.setItem('token', json.authToken)
      navigate('/');
      props.showAlert("Successfully logged in", "success")

    } else {
      props.showAlert("Invalid Details", "danger")
    }
  }

  const handleChange = (event) => {
    // spread operator to add into the credentials as the user is typing
    // and changing the value by whatever the user is typing
    // whatever the user is typing basically overwrites the new value
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
  </div>;
};

export default Login;
