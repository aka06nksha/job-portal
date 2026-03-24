import React, { useState } from 'react';
import './ApplyModal.css';

const ApplyModal = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    resume: null,
    coverLetter: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      ...formData,
      appliedAt: new Date().toISOString()
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <h2>Apply for <span className="accent">{job.title}</span></h2>
          <p className="company">{job.company}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              placeholder="John Doe" 
              required 
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="john@example.com" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="resume">Resume (PDF)</label>
            <div className="file-input-wrapper">
              <input 
                type="file" 
                id="resume" 
                name="resume" 
                accept=".pdf" 
                required 
                onChange={handleFileChange}
              />
              <div className="file-custom">
                {formData.resume ? formData.resume.name : 'Choose file or drag here'}
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter (Optional)</label>
            <textarea 
              id="coverLetter" 
              name="coverLetter" 
              rows="4" 
              placeholder="Tell us why you're a great fit..."
              value={formData.coverLetter}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <button type="submit" className="btn-primary full-width">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
