import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";
import ToastContainer from "../components/ToastContainer";

import "./Mainlayout.css";

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`iv-app-shell ${
        sidebarCollapsed ? "iv-sidebar-collapsed" : ""
      }`}
    >
      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}
      <header className="iv-header">
        <Navbar />
      </header>

      {/* =====================================================
          WORKSPACE
      ===================================================== */}
      <div className="iv-layout">

        {/* ===================================================
            LEFT SIDEBAR
        =================================================== */}
        <aside className="iv-left-sidebar">

          <div className="iv-sidebar-inner">

            {/* Collapse button */}
            <button
              type="button"
              className="iv-sidebar-toggle"
              onClick={() =>
                setSidebarCollapsed((prev) => !prev)
              }
              aria-label={
                sidebarCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
              title={
                sidebarCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={18} />
              ) : (
                <PanelLeftClose size={18} />
              )}
            </button>

            <Sidebar />

          </div>

        </aside>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}
        <main className="iv-main-content">

          <div className="iv-content-container">

            <Outlet />

          </div>

        </main>

        {/* ===================================================
            RIGHT SIDEBAR
        =================================================== */}
        <aside className="iv-right-sidebar">

          <div className="iv-right-inner">

            <RightSidebar />

          </div>

        </aside>

      </div>

      {/* =====================================================
          TOASTS
      ===================================================== */}
      <ToastContainer />

    </div>
  );
}