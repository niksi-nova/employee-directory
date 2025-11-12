import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Profile(){
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const nav = useNavigate();

  const fetch = async () => {
    try {
      const res = await API.get('/employees', { params: { q: id } });
      // Since backend doesn't have a single-get endpoint, try find by id:
      const found = res.data.find(e => e._id === id);
      if(found) setEmp(found);
      else {
        // fallback: fetch all then match
        const all = await API.get('/employees');
        setEmp(all.data.find(e => e._id === id));
      }
    } catch(err){ console.error(err); }
  };

  useEffect(()=>{ fetch(); }, [id]);

  const del = async () => {
    if(!window.confirm('Delete this employee?')) return;
    try { await API.delete('/employees/'+id); nav('/'); } catch(err){ alert('Delete failed'); }
  };

  if(!emp) return <div className="center" style={{padding:40}}>Loading...</div>;

  const initials = ((emp.firstName||'')[0] || '') + ((emp.lastName||'')[0] || '');

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="brand" style={{alignItems:'center'}}>
          <div className="logo">ED</div>
          <div style={{marginLeft:12}}>
            <div className="title">Employee profile</div>
            <div className="muted">{emp.firstName} {emp.lastName}</div>
          </div>
        </div>
        <div>
          <button className="btn" onClick={()=>nav('/')}>Back</button>
        </div>
      </div>

      <div className="profile-card">
        <div className="avatar">{initials}</div>
        <div className="meta">
          <h2 style={{marginTop:0}}>{emp.firstName} {emp.lastName}</h2>
          <div className="muted">{emp.title || '—'}</div>
          <div style={{marginTop:12}}><strong>Email:</strong> <div className="muted">{emp.email}</div></div>
          <div style={{marginTop:8}}><strong>Department:</strong> <div className="muted">{emp.department || '—'}</div></div>
          <div style={{marginTop:8}}><strong>Phone:</strong> <div className="muted">{emp.phone || '—'}</div></div>
          <div style={{marginTop:18, display:'flex', gap:10}}>
            <button className="btn" onClick={del}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
