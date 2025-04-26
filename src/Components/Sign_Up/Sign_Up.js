import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState([]);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // Validar que el teléfono tenga exactamente 10 dígitos
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setShowerr(["Phone number must be exactly 10 digits."]);
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
      }),
    });

    const json = await response.json();

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        const msgs = json.errors.map(error => error.msg);
        setShowerr(msgs);
      } else {
        setShowerr([json.error]);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" type="password" placeholder="Enter your password" />
            </div>

            {showerr.length > 0 && (
              <div className="err" style={{ color: 'red' }}>
                {showerr.map((msg, idx) => (
                  <div key={idx}>{msg}</div>
                ))}
              </div>
            )}

            <button className="button" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
