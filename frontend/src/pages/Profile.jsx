import React, { useState } from 'react';
import { User, Mail, FileText, Upload, Save, CheckCircle } from 'lucide-react';
import './Profile.css';

const Profile = ({ user, setUser }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || 'Passionate developer looking for new opportunities.',
    skills: user?.skills || 'React, Node.js, JavaScript'
  });
  const [resume, setResume] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    // In a real app, this would hit an API
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem('jobPortalUser', JSON.stringify(updatedUser));
    
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="profile-page container">
      <div className="profile-header">
        <h1>User <span className="accent">Profile</span></h1>
        <p>Manage your account settings and professional information.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card glass-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {formData.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-main-info">
            <h2>{formData.name}</h2>
            <p><Mail size={16} /> {formData.email}</p>
          </div>
          
          <div className="profile-section">
            <div className="section-header">
              <h3>About Me</h3>
              {!editing && <button onClick={() => setEditing(true)} className="btn-text">Edit</button>}
            </div>
            
            {editing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
                </div>
                <div className="form-group">
                  <label>Skills (comma separated)</label>
                  <input name="skills" value={formData.skills} onChange={handleChange} />
                </div>
                <button onClick={handleSave} className="btn-primary"><Save size={18} /> Save Profile</button>
              </div>
            ) : (
              <div className="view-info">
                <p>{formData.bio}</p>
                <div className="skills-tags">
                  {formData.skills.split(',').map(skill => (
                    <span key={skill} className="skill-tag">{skill.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="resume-card glass-card">
          <div className="section-header">
            <h3><FileText size={20} /> My Resume</h3>
          </div>
          <p>Upload your latest resume to increase your chances of getting hired.</p>
          
          <div className="resume-upload-box">
            <input type="file" id="resume-upload" accept=".pdf" onChange={handleFileChange} hidden />
            <label htmlFor="resume-upload" className="upload-label">
              <Upload size={40} />
              <span>{resume ? resume.name : 'Click to upload PDF resume'}</span>
            </label>
          </div>
          
          {resume && (
            <div className="resume-preview">
              <CheckCircle size={16} className="success" />
              <span>Resume uploaded successfully</span>
            </div>
          )}
        </div>
      </div>

      {saved && (
        <div className="toast success">
          <CheckCircle size={20} />
          <span>Profile updated successfully!</span>
        </div>
      )}
    </div>
  );
};

export default Profile;
