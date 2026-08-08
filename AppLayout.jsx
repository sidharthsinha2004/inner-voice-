import React from 'react';
import SideMenu from '../ui/SideMenu';
import TopBar from '../ui/TopBar';

export default function AppLayout({ children }) {
  return (
    <div className="app-container">
      {/* Sidebar on the Left */}
      <SideMenu />

      {/* Main Content Area on the Right */}
      <div className="main-wrapper">
        <TopBar />
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}