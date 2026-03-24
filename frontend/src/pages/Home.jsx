import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="container hero-content">
          <div className="badge">Featured: 2,500+ New Tech Jobs</div>
          <h1>Find Your <span className="gradient-text">Dream Career</span> in Minutes</h1>
          <p>The ultimate platform connecting ambitious developers with world-class opportunities. Search, apply, and track your journey to success.</p>
          <div className="hero-actions">
            <Link to="/jobs" className="btn-primary">Browse Jobs <ArrowRight size={20} /></Link>
            <Link to="/register" className="btn-secondary">Get Started</Link>
          </div>
        </div>
        <div className="hero-background">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
      </header>

      <section className="features container">
        <div className="feature-card glass-card">
          <Zap className="feature-icon" />
          <h3>Real-time Alerts</h3>
          <p>Get notified instantly when new jobs match your expertise.</p>
        </div>
        <div className="feature-card glass-card">
          <Globe className="feature-icon" />
          <h3>Global Reach</h3>
          <p>Access opportunities from verified companies worldwide.</p>
        </div>
        <div className="feature-card glass-card">
          <Shield className="feature-icon" />
          <h3>Verified Profiles</h3>
          <p>Your data is protected with enterprise-grade security.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
