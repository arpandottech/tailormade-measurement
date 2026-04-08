import React, { useState } from 'react';
import api from '../utils/api';
import { Camera, CheckCircle2 } from 'lucide-react';

const MeasurementPage = () => {
  const [activeField, setActiveField] = useState('default');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    contactDetails: '',
    category: '',
    measurements: {
      neck: '',
      shoulder: '',
      upperArm: '',
      chest: '',
      waist: '',
      hip: '',
      upperThigh: '',
      leftKnee: '',
      rightKnee: '',
      calf: '',
      ankle: '',
      length: '',
      weight: '',
    },
  });

  // Placeholder videos for demo if no real URLs. Use standard Pexels/Pixabay videos
  const videos = {
    default: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    customerName: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    contactDetails: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    category: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    neck: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    shoulder: 'https://ladodesignstudio.com/cdn/shop/videos/c/vp/c367636d64c44db094da534a10db4bec/c367636d64c44db094da534a10db4bec.HD-720p-1.6Mbps-77415653.mp4?v=0',
    upperArm: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    chest: 'https://cdn.pixabay.com/video/2020/05/26/40118-425026217_tiny.mp4',
    waist: 'https://cdn.pixabay.com/video/2019/04/10/22744-330691763_tiny.mp4',
    hip: 'https://cdn.pixabay.com/video/2019/04/10/22744-330691763_tiny.mp4',
    upperThigh: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    leftKnee: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    rightKnee: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    calf: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    ankle: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    length: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
    weight: 'https://cdn.pixabay.com/video/2021/08/25/86260-593539572_tiny.mp4',
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleChange = (e, section, field) => {
    if (section === 'main') {
      setFormData({ ...formData, [field]: e.target.value });
    } else {
      setFormData({
        ...formData,
        measurements: {
          ...formData.measurements,
          [field]: e.target.value,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/measurements', formData);
      setSuccess(true);
      setFormData({
        customerName: '',
        contactDetails: '',
        category: '',
        measurements: {
          neck: '',
          shoulder: '',
          upperArm: '',
          chest: '',
          waist: '',
          hip: '',
          upperThigh: '',
          leftKnee: '',
          rightKnee: '',
          calf: '',
          ankle: '',
          length: '',
          weight: '',
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit data');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="measurement-split" style={{ justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: '500px', margin: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <CheckCircle2 size={100} color="#10b981" />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Success!</h2>
          <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
            Your measurement profile has been recorded securely. Our team will review your fit shortly!
          </p>
          <button onClick={() => { setSuccess(false); setActiveField('default'); }} className="glass-btn" style={{ width: '100%' }}>
            Submit Another Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="measurement-split">
      {/* LEFT: Video Section */}
      <div className="measurement-video-col">
        <div className="video-reel-container">
          {Object.entries(videos).map(([key, url]) => (
            <video
              key={key}
              src={url}
              autoPlay
              loop
              muted
              playsInline
              className={activeField === key ? 'active' : ''}
            />
          ))}
          {/* Fallback overly if video is not distinct enough or loading */}
          <div className="video-overlay-text">
            <h2>{activeField === 'default' ? 'Welcome' : activeField.charAt(0).toUpperCase() + activeField.slice(1)}</h2>
            <p>
              {activeField === 'default'
                ? 'Enter details to begin'
                : `Measure your ${activeField} securely`}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Form Section */}
      <div className="measurement-form-col">
        <div className="form-header">
          <h1>Perfect Fit</h1>
          <p className="text-muted">Enter your custom measurements to personalize your tailoring experience.</p>
        </div>

        {error && <div className="text-error mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem' }}>

          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Select Clothing Type</h3>

          <div className="form-group">
            <div className="field-highlight"></div>
            <label>Which measurement you want to measure? *</label>
            <select
              required
              className="glass-input"
              value={formData.category}
              onChange={(e) => handleChange(e, 'main', 'category')}
              style={{ appearance: 'auto', cursor: 'pointer' }}
            >
              <option value="" disabled>Select an option</option>
              <option value="Saree">Saree</option>
              <option value="Kurti">Kurti</option>
              <option value="Blouse">Blouse</option>
            </select>
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Personal Details</h3>

          <div className="form-group">
            <div className="field-highlight"></div>
            <label>Customer Name *</label>
            <input
              type="text"
              required
              className="glass-input"
              placeholder="e.g. John Doe"
              value={formData.customerName}
              onFocus={() => handleFocus('customerName')}
              onChange={(e) => handleChange(e, 'main', 'customerName')}
            />
          </div>

          <div className="form-group">
            <div className="field-highlight"></div>
            <label>Contact Details *</label>
            <input
              type="text"
              required
              className="glass-input"
              placeholder="Email or Phone Number"
              value={formData.contactDetails}
              onFocus={() => handleFocus('contactDetails')}
              onChange={(e) => handleChange(e, 'main', 'contactDetails')}
            />
          </div>

          <h3 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Body Measurements</h3>

          <div className="measurements-grid">
            {['neck', 'shoulder', 'upperArm', 'chest', 'waist', 'hip', 'upperThigh', 'leftKnee', 'rightKnee', 'calf', 'ankle', 'length', 'weight'].map((field) => (
              <React.Fragment key={field}>
                {activeField === field && (
                  <div className="mobile-video-wrapper">
                    <video src={videos[field]} autoPlay loop muted playsInline />
                    <div className="mobile-video-overlay">
                      <h2>{field.charAt(0).toUpperCase() + field.slice(1)}</h2>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <div className="field-highlight"></div>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)} (inches)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="glass-input"
                    placeholder="0.0"
                    value={formData.measurements[field]}
                    onFocus={() => handleFocus(field)}
                    onChange={(e) => handleChange(e, 'measurements', field)}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>

          <button
            type="submit"
            className="glass-btn w-full mt-4 flex items-center"
            style={{ justifyContent: 'center', gap: '8px' }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Measurements'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default MeasurementPage;
