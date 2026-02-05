import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UnsavedChanges.css';

const UnsavedChanges = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [savedData, setSavedData] = useState({ name: '', email: '' });
  const [showWarning, setShowWarning] = useState(false);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(savedData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSavedData(formData);
    alert('Saved!');
  };

  const handleNavigate = () => {
    if (hasChanges) {
      setShowWarning(true);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>Task B: Unsaved Changes Warning</h2>
      
      <div className="form">
        <div>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button onClick={handleSave}>Save</button>
      </div>

      <button onClick={handleNavigate} style={{marginTop: '20px'}}>Go Home</button>

      {showWarning && (
        <div className="warning-overlay">
          <div className="warning">
            <h3>Unsaved Changes!</h3>
            <p>You have unsaved changes. Are you sure you want to leave?</p>
            <div className="warning-buttons">
              <button onClick={() => setShowWarning(false)}>Stay</button>
              <button onClick={() => navigate('/')}>Leave Anyway</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsavedChanges;
