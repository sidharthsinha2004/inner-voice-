import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import navItems from "../data/navItems";
import { useAppData } from "../context/AppDataContext";
import ConfirmDialog from "./ConfirmDialog";

export default function Sidebar() {
  const { logout } = useAppData();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <aside className="iv-sidebar">

      {/* =====================================================
          SIDEBAR CONTENT
      ===================================================== */}
      <div className="iv-sidebar-card">

        {/* ===================================================
            BRAND / SECTION HEADER
        =================================================== */}
        <div className="iv-sidebar-heading">

          <div className="iv-sidebar-heading-icon">
            <Sparkles size={15} />
          </div>

          <div className="iv-sidebar-heading-text">
            <span>Workspace</span>
            <small>Navigation</small>
          </div>

        </div>

        {/* ===================================================
            NAVIGATION
        =================================================== */}
        <nav className="iv-sidebar-nav">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `iv-nav-item ${
                    isActive ? "iv-nav-item-active" : ""
                  }`
                }
              >

                {/* Icon */}
                <span className="iv-nav-icon">
                  <Icon size={19} strokeWidth={2} />
                </span>

                {/* Label */}
                <span className="iv-nav-label">
                  {item.title}
                </span>

                {/* Active arrow */}
                <ChevronRight
                  className="iv-nav-arrow"
                  size={15}
                />

              </NavLink>
            );
          })}

        </nav>

        {/* ===================================================
            DIVIDER
        =================================================== */}
        <div className="iv-sidebar-divider" />

        {/* ===================================================
            LOGOUT
        =================================================== */}
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="iv-logout-button"
        >

          <span className="iv-logout-icon">
            <LogOut size={18} />
          </span>

          <span className="iv-logout-label">
            Logout
          </span>

        </button>

      </div>

      {/* =====================================================
          CONFIRM DIALOG
      ===================================================== */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={logout}
        title="Log out of InnerVoice?"
        message="You can log back in anytime — your posts and bookmarks will be waiting for you."
        confirmLabel="Logout"
      />

    </aside>
  );
}