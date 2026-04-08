import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { LogOut, Activity, Users, FileText, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeasurements = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin');
        return;
      }

      try {
        const { data } = await api.get('/api/measurements');
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredMeasurements = measurements.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const customerMatch = item.customerName?.toLowerCase().includes(searchLower) || false;
    const contactMatch = item.contactDetails?.toLowerCase().includes(searchLower) || false;
    const categoryMatch = item.category?.toLowerCase().includes(searchLower) || false;
    return customerMatch || contactMatch || categoryMatch;
  });

  const totalPages = Math.ceil(filteredMeasurements.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeasurements = filteredMeasurements.slice(startIndex, startIndex + itemsPerPage);

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
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

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
          <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Search by customer, contact or category..." 
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ paddingLeft: '38px', width: '100%' }}
          />
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
            {paginatedMeasurements.map((item) => (
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
            {paginatedMeasurements.length === 0 && (
              <tr>
                <td colSpan="17" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--color-text-muted)' }}>
                    <FileText size={32} />
                    <p>{searchTerm ? 'No matching records found.' : 'No measurement records found.'}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Showing {filteredMeasurements.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMeasurements.length)} of {filteredMeasurements.length} entries
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="glass-btn" 
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span style={{ margin: '0 10px', color: 'var(--color-text)', fontWeight: '600' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="glass-btn" 
            style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
