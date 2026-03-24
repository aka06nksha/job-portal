import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User, LogOut, Search, ClipboardList } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar glass-card">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Briefcase className="logo-icon" />
          <span>Job<span className="accent">Portal</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/jobs" className="nav-link"><Search size={18} /> Find Jobs</Link>
          {user ? (
            <>
              <Link to="/my-applications" className="nav-link"><ClipboardList size={18} /> My Apps</Link>
              <div className="user-profile">
                <Link to="/profile" className="nav-link user-profile-link">
                  <User size={18} />
                  <span className="user-name">{user.name}</span>
                </Link>
                <button onClick={handleLogoutClick} className="btn-logout" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
