import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // Validación de teléfono (exactamente 10 dígitos numéricos)
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setShowerr("Phone number must be exactly 10 digits.");
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
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
        for (const error of json.errors) {
          setShowerr(error.msg);
        }
      } else {
        setShowerr(json.error);
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
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" name="phone" id="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
            </div>
            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
            <button className="button" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
