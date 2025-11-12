import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function Topbar({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user')||'null');
  return (
    <div className="topbar">
      <div className="brand">
        <div className="logo">ED</div>
        <div>
          <div className="title">Employee Directory</div>
          <div className="muted">Blue team · Admin panel</div>
        </div>
      </div>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        {user && <div style={{textAlign:'right'}}><div style={{fontWeight:700}}>{user.name}</div><div className="muted">{user.email}</div></div>}
        <button className="logout" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default function Home(){
  const [employees, setEmployees] = useState([]);
  const [q, setQ] = useState('');
  const [department, setDepartment] = useState('');
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', department:'', title:'' });
  const nav = useNavigate();

  const fetchList = async () => {
    try {
      const res = await API.get('/employees', { params: { q, department } });
      setEmployees(res.data);
    } catch(err){ console.error(err); }
  };

  useEffect(()=>{ fetchList(); }, []);

  const search = async (e) => { e.preventDefault(); fetchList(); };

  const add = async (e) => {
    e.preventDefault();
    try {
      await API.post('/employees', form);
      setForm({ firstName:'', lastName:'', email:'', department:'', title:'' });
      fetchList();
    } catch(err){ alert(err.response?.data?.msg || 'Failed'); }
  };

  const del = async (id) => {
    if(!window.confirm('Delete employee?')) return;
    try { await API.delete('/employees/'+id); fetchList(); } catch(err){ alert('Delete failed'); }
  };

  const goto = (id) => { nav('/employee/'+id); };

  return (
    <div className="container">
      <Topbar onLogout={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); nav('/login'); }} />
      <form onSubmit={search} className="search-row">
        <input className="input" placeholder="Search by name, email, title..." value={q} onChange={e=>setQ(e.target.value)} />
        <input className="input small" placeholder="Department" value={department} onChange={e=>setDepartment(e.target.value)} />
        <button className="btn">Search</button>
      </form>

      <div className="add-panel">
        <div style={{flex:1,display:'flex',gap:8}}>
          <input className="form-input" placeholder="First name" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} />
          <input className="form-input" placeholder="Last name" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} />
          <input className="form-input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        </div>
        <div style={{display:'flex',gap:8}}>
          <input className="form-input" placeholder="Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} />
          <input className="form-input" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <button className="btn" onClick={add}>Add</button>
        </div>
      </div>

      <div className="card-grid" style={{marginTop:20}}>
        {employees.map(emp => (
          <div key={emp._id} className="employee-card" onClick={()=>goto(emp._id)}>
            <div className="emp-name">{emp.firstName} {emp.lastName}</div>
            <div className="emp-role">{emp.title || '—'}</div>
            <div className="muted" style={{marginTop:10}}>{emp.department || 'Unknown'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
