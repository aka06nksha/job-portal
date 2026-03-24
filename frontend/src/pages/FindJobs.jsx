import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import JobCard from '../components/JobCard';
import './FindJobs.css';

const FindJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('developer');
  const [location, setLocation] = useState('india');
  const [experience, setExperience] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/search?keyword=${keyword}&location=${location}&experience=${experience}`);
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="find-jobs-page container">
      <div className="search-section glass-card">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Job Title, Keywords..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="search-input">
            <MapPin size={20} />
            <input 
              type="text" 
              placeholder="Location..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="search-input">
            <select 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)}
              className="exp-select"
            >
              <option value="">Any Experience</option>
              <option value="freshers">Freshers (0-2 yrs)</option>
              <option value="intermediate">Intermediate (3-5 yrs)</option>
              <option value="senior">Senior (5+ yrs)</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Find Jobs</button>
        </form>
      </div>

      <div className="results-header">
        <h2>Latest Jobs <span className="accent">For You</span></h2>
        <p>{jobs.length} positions found</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 className="animate-spin" size={48} />
          <p>Searching for opportunities...</p>
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindJobs;
