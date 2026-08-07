import React from 'react';

export default function SideMenu() {
  return (
    <aside className="side-menu">
      <div className="brand">
        <h2>InnerVoice</h2>
        <p className="tagline">Your Inner Thoughts</p>
      </div>

      <nav className="nav-links">
        <a href="#home" className="active">Home</a>
        <a href="#community">Community</a>
        <a href="#wellness">Wellness</a>
        <a href="#notifications">Notifications</a>
        <a href="#profile">Profile</a>
        <a href="#settings">Settings</a>
        <a href="#admin">Admin Dashboard</a>
      </nav>

      <div className="user-profile-badge">
        <div className="user-info">
          <strong>Anonymous Owl</strong>
          <span>Stay Positive 🌿</span>
        </div>
        <button className="logout-btn">Logout</button>
      </div>
    </aside>
  );
}