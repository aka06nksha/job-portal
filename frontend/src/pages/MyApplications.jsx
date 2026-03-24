import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import './MyApplications.css';

const MyApplications = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('/api/applications/my', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setApplications(data);
        } else {
          console.error('Failed to fetch applications:', data.error);
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [user.email]);

  return (
    <div className="my-apps-page container">
      <div className="header">
        <h1>My <span className="accent">Applications</span></h1>
        <p>Keep track of all your job applications in one place.</p>
      </div>

      {loading ? (
        <div className="loading">Loading your applications...</div>
      ) : applications.length === 0 ? (
        <div className="empty-state glass-card">
          <Briefcase size={60} className="icon" />
          <h3>No applications yet</h3>
          <p>You haven't applied to any jobs yet. Start exploring now!</p>
          <a href="/jobs" className="btn-primary">Browse Jobs</a>
        </div>
      ) : (
        <div className="apps-list">
          {applications.map(app => (
            <div key={app.id} className="app-card glass-card">
              <div className="app-main">
                <div className="app-info">
                  <h3>{app.jobTitle}</h3>
                  <p className="company">{app.company}</p>
                </div>
                <div className="app-status">
                  <span className="status-badge">Applied</span>
                </div>
              </div>
              <div className="app-meta">
                <span><Calendar size={16} /> Applied on: {new Date(app.appliedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
