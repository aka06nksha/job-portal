import React, { useState } from 'react';
import { MapPin, IndianRupee, ExternalLink, CheckCircle } from 'lucide-react';
import './JobCard.css';

const JobCard = ({ job, user }) => {
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setApplying(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          jobTitle: job.title,
          company: job.company
        }),
      });

      if (response.ok) {
        setApplied(true);
      }
    } catch (err) {
      console.error('Error applying:', err);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="job-card glass-card">
      <div className="job-header">
        <h3 dangerouslySetInnerHTML={{ __html: job.title }}></h3>
        <p className="company">{job.company}</p>
      </div>
      
      <div className="job-details">
        <div className="detail">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="detail">
          <IndianRupee size={16} />
          <span>{job.salary}</span>
        </div>
      </div>

      <p className="description" dangerouslySetInnerHTML={{ __html: job.description.substring(0, 150) + '...' }}></p>
      
      <div className="job-actions">
        {applied ? (
          <button className="btn-applied" disabled>
            <CheckCircle size={18} /> Applied
          </button>
        ) : (
          <button 
            onClick={handleApply} 
            className="btn-primary"
            disabled={applying}
          >
            {applying ? 'Applying...' : 'Apply Now'}
          </button>
        )}
        <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn-secondary icon-btn">
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};

export default JobCard;
