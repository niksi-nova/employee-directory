import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Signup(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await API.post('/auth/register', { name, email, password });
      setMsg('Account created. Redirecting to login...');
      setTimeout(()=> nav('/login'), 1200);
    } catch(err){
      setMsg(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Create admin account</h2>
      <p className="muted">Only admins can manage employees.</p>
      <form onSubmit={submit} style={{display:'grid',gap:10, marginTop:12}}>
        <input className="form-input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="form-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="form-input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Sign up</button>
        {msg && <div style={{color:msg.startsWith('Account')?'green':'crimson'}}>{msg}</div>}
      </form>
      <div className="footer-note">Already have an account? <Link to="/login" className="link">Login</Link></div>
    </div>
  );
}
