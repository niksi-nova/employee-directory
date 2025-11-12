import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
    } catch(err){
      setErr(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome back</h2>
      <p className="muted">Login as admin to manage the employee directory.</p>
      <form onSubmit={submit} style={{display:'grid',gap:10, marginTop:12}}>
        <input className="form-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="form-input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
        {err && <div style={{color:'crimson'}}>{err}</div>}
      </form>
      <div className="footer-note">Don't have an account? <Link to="/signup" className="link">Sign up</Link></div>
    </div>
  );
}
