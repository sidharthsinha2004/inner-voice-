import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Bell,
  Search,
  Plus,
  Bot,
  ChevronDown,
  Menu,
  Heart,
  MessageCircle,
  UserPlus,
  Users,
  Repeat2,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  CheckCheck,
  Sparkles,
} from "lucide-react";

import { useAppData } from "../context/AppDataContext";
import { useTheme } from "../context/ThemeContext";
import MobileMenu from "./MobileMenu";
import ConfirmDialog from "./ConfirmDialog";
import AIAssistantModal from "./AIAssistantModal";

const NOTIF_ICONS = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  community: Users,
  repost: Repeat2,
};

export default function Navbar() {
  const navigate = useNavigate();

  const { isDark, toggleTheme } = useTheme();

  const {
    currentUser,
    notifications,
    unreadNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    logout,
  } = useAppData();

  const [searchValue, setSearchValue] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const closeAllDropdowns = () => {
    setNotifOpen(false);
    setUserMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const q = searchValue.trim();

    navigate(
      q
        ? `/search?q=${encodeURIComponent(q)}`
        : "/search"
    );
  };

  return (
    <header className="iv-navbar">

      {/* =====================================================
          NAVBAR INNER
      ===================================================== */}

      <div className="iv-navbar-inner">

        {/* ===================================================
            LEFT / BRAND
        =================================================== */}

        <div className="iv-navbar-left">

          {/* Mobile menu */}
          <button
            type="button"
            className="iv-navbar-mobile-menu"
            onClick={() => {
              closeAllDropdowns();
              setMobileMenuOpen(true);
            }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>


          {/* Brand */}
          <Link
            to="/"
            className="iv-brand"
            onClick={closeAllDropdowns}
          >

            <div className="iv-brand-mark">
              <span>I</span>
            </div>

            <div className="iv-brand-copy">
              <h1>
                Inner<span>Voice</span>
              </h1>

              <p>
                Express. Connect. Inspire.
              </p>
            </div>

          </Link>

        </div>


        {/* ===================================================
            SEARCH
        =================================================== */}

        <form
          className="iv-navbar-search"
          onSubmit={handleSearchSubmit}
        >

          <Search
            size={18}
            className="iv-search-icon"
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value)
            }
            placeholder="Search thoughts, people, communities..."
            aria-label="Search InnerVoice"
          />

          <kbd className="iv-search-shortcut">
            /
          </kbd>

        </form>


        {/* ===================================================
            RIGHT ACTIONS
        =================================================== */}

        <div className="iv-navbar-actions">

          {/* Mobile Search */}
          <Link
            to="/search"
            className="iv-navbar-icon-button iv-mobile-search"
            aria-label="Search"
          >
            <Search size={19} />
          </Link>


          {/* =================================================
              AI
          ================================================= */}

          <button
            type="button"
            className="iv-ai-button"
            onClick={() => {
              setAiOpen(true);
              closeAllDropdowns();
            }}
          >

            <span className="iv-ai-icon">
              <Bot size={16} />
            </span>

            <span className="iv-ai-text">
              AI
            </span>

            <Sparkles
              size={12}
              className="iv-ai-sparkle"
            />

          </button>


          {/* =================================================
              CREATE
          ================================================= */}

          <button
            type="button"
            className="iv-create-button"
            onClick={() => {
              closeAllDropdowns();
              navigate("/create-post");
            }}
          >

            <span className="iv-create-icon">
              <Plus size={17} />
            </span>

            <span>
              Create
            </span>

          </button>


          {/* =================================================
              THEME
          ================================================= */}

          <button
            type="button"
            className="iv-navbar-icon-button iv-theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >

            {isDark ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}

          </button>


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div className="iv-navbar-dropdown">

            <button
              type="button"
              className="iv-navbar-icon-button iv-notification-button"
              onClick={() => {
                setNotifOpen((value) => !value);
                setUserMenuOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={notifOpen}
            >

              <Bell size={20} />

              {unreadNotifications > 0 && (
                <span className="iv-notification-badge">
                  {unreadNotifications > 9
                    ? "9+"
                    : unreadNotifications}
                </span>
              )}

            </button>


            {notifOpen && (
              <>

                <div
                  className="iv-dropdown-overlay"
                  onClick={closeAllDropdowns}
                />

                <div className="iv-notification-panel">

                  {/* Notification header */}

                  <div className="iv-dropdown-header">

                    <div>

                      <div className="iv-panel-title">
                        <span className="iv-panel-title-icon">
                          <Bell size={14} />
                        </span>

                        <div>
                          <h3>
                            Notifications
                          </h3>

                          <p>
                            Your latest activity
                          </p>
                        </div>
                      </div>

                    </div>

                    {unreadNotifications > 0 && (
                      <button
                        type="button"
                        className="iv-mark-read"
                        onClick={markAllNotificationsRead}
                      >
                        <CheckCheck size={14} />
                        Mark all
                      </button>
                    )}

                  </div>


                  {/* Notification list */}

                  <div className="iv-notification-list">

                    {notifications.length === 0 ? (

                      <div className="iv-empty-notifications">

                        <div className="iv-empty-notification-icon">
                          <CheckCheck size={20} />
                        </div>

                        <strong>
                          You're all caught up
                        </strong>

                        <span>
                          No new notifications
                        </span>

                      </div>

                    ) : (

                      notifications.map((notification) => {

                        const Icon =
                          NOTIF_ICONS[
                            notification.type
                          ] || Bell;

                        return (

                          <button
                            type="button"
                            key={notification.id}
                            className={`iv-notification-item ${
                              !notification.read
                                ? "is-unread"
                                : ""
                            }`}
                            onClick={() =>
                              markNotificationRead(
                                notification.id
                              )
                            }
                          >

                            <div className="iv-notification-icon">
                              <Icon size={15} />
                            </div>

                            <div className="iv-notification-content">

                              <p>
                                {notification.text}
                              </p>

                              <span>
                                {notification.time}
                              </span>

                            </div>

                            {!notification.read && (
                              <span className="iv-unread-dot" />
                            )}

                          </button>

                        );

                      })

                    )}

                  </div>

                </div>

              </>
            )}

          </div>


          {/* =================================================
              PROFILE
          ================================================= */}

          <div className="iv-navbar-dropdown">

            <button
              type="button"
              className="iv-profile-button"
              onClick={() => {
                setUserMenuOpen((value) => !value);
                setNotifOpen(false);
              }}
              aria-expanded={userMenuOpen}
            >

              <div className="iv-profile-avatar">
                {currentUser?.initial || "U"}
              </div>

              <div className="iv-profile-info">

                <span>
                  {currentUser?.name || "User"}
                </span>

                <small>
                  My account
                </small>

              </div>

              <ChevronDown
                size={15}
                className={`iv-profile-chevron ${
                  userMenuOpen
                    ? "is-open"
                    : ""
                }`}
              />

            </button>


            {userMenuOpen && (
              <>

                <div
                  className="iv-dropdown-overlay"
                  onClick={closeAllDropdowns}
                />

                <div className="iv-user-panel">

                  {/* User header */}

                  <div className="iv-user-panel-header">

                    <div className="iv-user-avatar-large">
                      {currentUser?.initial || "U"}
                    </div>

                    <div className="iv-user-details">

                      <strong>
                        {currentUser?.name || "User"}
                      </strong>

                      <span>
                        {currentUser?.bio ||
                          "Welcome to InnerVoice"}
                      </span>

                    </div>

                  </div>


                  {/* Menu */}

                  <div className="iv-user-menu">

                    <button
                      type="button"
                      onClick={() => {
                        closeAllDropdowns();
                        navigate("/profile");
                      }}
                    >

                      <span className="iv-menu-icon">
                        <User size={16} />
                      </span>

                      <span className="iv-menu-text">
                        <strong>
                          View Profile
                        </strong>

                        <small>
                          Manage your profile
                        </small>
                      </span>

                    </button>


                    <button
                      type="button"
                      onClick={() => {
                        closeAllDropdowns();
                        navigate("/settings");
                      }}
                    >

                      <span className="iv-menu-icon">
                        <Settings size={16} />
                      </span>

                      <span className="iv-menu-text">
                        <strong>
                          Settings
                        </strong>

                        <small>
                          Preferences & privacy
                        </small>
                      </span>

                    </button>


                    <button
                      type="button"
                      onClick={toggleTheme}
                    >

                      <span className="iv-menu-icon">
                        {isDark ? (
                          <Sun size={16} />
                        ) : (
                          <Moon size={16} />
                        )}
                      </span>

                      <span className="iv-menu-text">
                        <strong>
                          {isDark
                            ? "Light Mode"
                            : "Dark Mode"}
                        </strong>

                        <small>
                          Change appearance
                        </small>
                      </span>

                      <span className="iv-menu-status">
                        {isDark
                          ? "Dark"
                          : "Light"}
                      </span>

                    </button>

                  </div>


                  {/* Logout */}

                  <div className="iv-user-logout">

                    <button
                      type="button"
                      onClick={() => {
                        closeAllDropdowns();
                        setLogoutConfirmOpen(true);
                      }}
                    >

                      <span className="iv-menu-icon">
                        <LogOut size={16} />
                      </span>

                      <span>
                        Logout
                      </span>

                    </button>

                  </div>

                </div>

              </>
            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() =>
          setMobileMenuOpen(false)
        }
        onLogoutClick={() => {
          setMobileMenuOpen(false);
          setLogoutConfirmOpen(true);
        }}
      />


      {/* =====================================================
          AI ASSISTANT
      ===================================================== */}

      <AIAssistantModal
        open={aiOpen}
        onClose={() =>
          setAiOpen(false)
        }
      />


      {/* =====================================================
          LOGOUT CONFIRM
      ===================================================== */}

      <ConfirmDialog
        open={logoutConfirmOpen}
        onClose={() =>
          setLogoutConfirmOpen(false)
        }
        onConfirm={logout}
        title="Log out of InnerVoice?"
        message="You can log back in anytime — your posts and bookmarks will be waiting for you."
        confirmLabel="Logout"
      />

    </header>
  );
}