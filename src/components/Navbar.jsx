import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Bell,
  Search,
  PlusCircle,
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
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-stone-950/85 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition text-stone-700 dark:text-stone-200"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0">
          <div className="h-11 w-11 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white text-xl font-bold shadow-md">
            I
          </div>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-[var(--accent)] dark:text-[var(--accent-text-dark)]">
              InnerVoice
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Express. Connect. Inspire.
            </p>
          </div>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-[420px] bg-stone-100 dark:bg-stone-900 rounded-full px-4 py-3 border border-transparent hover:border-[var(--accent)] focus-within:border-[var(--accent)] transition"
        >
          <Search size={18} className="text-stone-500 dark:text-stone-400 shrink-0" />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search thoughts, people, communities..."
            className="bg-transparent outline-none ml-3 w-full text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400"
          />
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Mobile search */}
          <Link
            to="/search"
            className="md:hidden p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition text-stone-700 dark:text-stone-200"
            aria-label="Search"
          >
            <Search size={20} />
          </Link>

          {/* AI */}
          <button
            onClick={() => setAiOpen(true)}
            className="hidden md:flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-full hover:bg-[var(--accent-hover)] transition"
          >
            <Bot size={18} />
            AI
          </button>

          {/* Create */}
          <button
            onClick={() => navigate("/create-post")}
            className="hidden md:flex items-center gap-2 bg-[#B87D22] text-white px-4 py-2 rounded-full hover:scale-105 transition"
          >
            <PlusCircle size={18} />
            Create
          </button>
          <button
            onClick={() => navigate("/create-post")}
            className="md:hidden p-2.5 rounded-full bg-[#B87D22] text-white transition"
            aria-label="Create post"
          >
            <PlusCircle size={20} />
          </button>

          {/* Theme quick toggle (desktop) */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setUserMenuOpen(false);
              }}
              className="relative p-3 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition text-stone-700 dark:text-stone-200"
              aria-label="Notifications"
            >
              <Bell size={22} />
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full" />
              )}
            </button>

            {notifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={closeAllDropdowns}
                />
                <div className="absolute right-0 mt-2 w-80 max-h-[26rem] overflow-y-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 dark:border-stone-800 sticky top-0 bg-white dark:bg-stone-900">
                    <h3 className="font-bold text-stone-900 dark:text-stone-50 text-sm">
                      Notifications
                    </h3>
                    {unreadNotifications > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="flex items-center gap-1 text-xs font-medium text-[var(--accent)] dark:text-[var(--accent-text-dark)] hover:underline"
                      >
                        <CheckCheck size={14} />
                        Mark all read
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-stone-500 dark:text-stone-400 px-4 py-8 text-center">
                      You're all caught up.
                    </p>
                  ) : (
                    notifications.map((n) => {
                      const Icon = NOTIF_ICONS[n.type] || Bell;
                      return (
                        <button
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`w-full flex items-start gap-3 text-left px-4 py-3 border-b border-stone-50 dark:border-stone-800/60 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition ${
                            !n.read ? "bg-[var(--accent-soft)] dark:bg-stone-800/70" : ""
                          }`}
                        >
                          <div className="h-9 w-9 rounded-full bg-[var(--accent-soft)] dark:bg-stone-800 flex items-center justify-center text-[var(--accent)] dark:text-[var(--accent-text-dark)] shrink-0">
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-stone-700 dark:text-stone-200 leading-5">
                              {n.text}
                            </p>
                            <p className="text-xs text-stone-400 mt-1">{n.time}</p>
                          </div>
                          {!n.read && (
                            <span className="h-2 w-2 rounded-full bg-[var(--accent)] dark:bg-[var(--accent-text-dark)] mt-1.5 shrink-0" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen((v) => !v);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 sm:gap-3 bg-stone-100 dark:bg-stone-900 rounded-full px-2 py-1 hover:bg-stone-200 dark:hover:bg-stone-800 transition"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3B8069] to-[#5F8CAE] flex items-center justify-center text-white font-bold">
                {currentUser.initial}
              </div>
              <ChevronDown size={18} className="text-stone-500 dark:text-stone-400 hidden sm:block" />
            </button>

            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={closeAllDropdowns}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                  <div className="px-4 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#3B8069] to-[#5F8CAE] flex items-center justify-center text-white font-bold">
                      {currentUser.initial}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-900 dark:text-stone-50 text-sm truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        {currentUser.bio}
                      </p>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        closeAllDropdowns();
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
                    >
                      <User size={17} />
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        closeAllDropdowns();
                        navigate("/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
                    >
                      <Settings size={17} />
                      Settings
                    </button>

                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
                    >
                      <span className="flex items-center gap-3">
                        {isDark ? <Sun size={17} /> : <Moon size={17} />}
                        {isDark ? "Light Mode" : "Dark Mode"}
                      </span>
                    </button>
                  </div>

                  <div className="border-t border-stone-100 dark:border-stone-800 py-2">
                    <button
                      onClick={() => {
                        closeAllDropdowns();
                        setLogoutConfirmOpen(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onLogoutClick={() => setLogoutConfirmOpen(true)}
      />

      <AIAssistantModal open={aiOpen} onClose={() => setAiOpen(false)} />

      <ConfirmDialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={logout}
        title="Log out of InnerVoice?"
        message="You can log back in anytime — your posts and bookmarks will be waiting for you."
        confirmLabel="Logout"
      />
    </header>
  );
}
