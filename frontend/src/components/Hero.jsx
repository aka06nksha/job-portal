import React from 'react';
import './Hero.css';

const Hero = ({ onFilterChange, activeFilter }) => {
  const technologies = ["All", "Software Engineer", "Frontend Developer", "DevOps"];

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Next <span className="gradient-text">Dream Job</span></h1>
        <p className="hero-subtitle">
          Discover the latest opportunities in technology. Filter by your expertise and apply in seconds.
        </p>
        
        <div className="filter-container glass-card">
          <div className="filter-label">Filter by Technology:</div>
          <div className="filter-chips">
            {technologies.map((tech) => (
              <button
                key={tech}
                className={`filter-chip ${activeFilter === tech ? 'active' : ''}`}
                onClick={() => onFilterChange(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
