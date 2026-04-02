import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, Activity, Users, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeasurements = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/measurements', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMeasurements(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Unauthorized or server error');
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }
      }
    };

    fetchMeasurements();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="dashboard-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <h2>Loading secure data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header glass-panel" style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Activity color="var(--color-primary)" size={28} />
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Admin Dashboard</h1>
        </div>
        <button onClick={handleLogout} className="glass-btn" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
         <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: 'rgba(72, 32, 97, 0.2)', padding: '15px', borderRadius: '12px' }}>
              <Users color="var(--color-primary)" size={24} />
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Total Profiles</p>
              <h2 style={{ fontSize: '1.8rem' }}>{measurements.length}</h2>
            </div>
         </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table className="glass-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Contact</th>
              <th>Neck</th>
              <th>Shoulder</th>
              <th>Upper Arm</th>
              <th>Chest</th>
              <th>Waist</th>
              <th>Hip</th>
              <th>Upper Thigh</th>
              <th>L. Knee</th>
              <th>R. Knee</th>
              <th>Calf</th>
              <th>Ankle</th>
              <th>Length</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((item) => (
              <tr key={item._id}>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{item.customerName}</td>
                <td>{item.category}</td>
                <td>{item.contactDetails}</td>
                <td>{item.measurements?.neck || '-'}</td>
                <td>{item.measurements?.shoulder || '-'}</td>
                <td>{item.measurements?.upperArm || '-'}</td>
                <td>{item.measurements?.chest || '-'}</td>
                <td>{item.measurements?.waist || '-'}</td>
                <td>{item.measurements?.hip || item.measurements?.hips || '-'}</td>
                <td>{item.measurements?.upperThigh || '-'}</td>
                <td>{item.measurements?.leftKnee || '-'}</td>
                <td>{item.measurements?.rightKnee || '-'}</td>
                <td>{item.measurements?.calf || '-'}</td>
                <td>{item.measurements?.ankle || '-'}</td>
                <td>{item.measurements?.length || '-'}</td>
                <td>{item.measurements?.weight || '-'}</td>
              </tr>
            ))}
            {measurements.length === 0 && (
              <tr>
                <td colSpan="17" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--color-text-muted)' }}>
                    <FileText size={32} />
                    <p>No measurement records found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
