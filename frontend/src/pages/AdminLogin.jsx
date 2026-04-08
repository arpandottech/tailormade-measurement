import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="glass-panel admin-glass-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '50%' }}>
            <Lock size={32} color="var(--color-primary)" />
          </div>
        </div>
        <h2>Admin Gateway</h2>
        {error && <p className="text-error" style={{ marginBottom: '15px' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Admin ID</label>
            <input
              type="text"
              className="glass-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left', marginTop: '15px' }}>
            <label>Password</label>
            <input
              type="password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="glass-btn w-full mt-4">
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
