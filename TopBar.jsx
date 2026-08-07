import {
  Search,
  Bell,
  Moon,
  Sun,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function TopBar() {
  const navigate = useNavigate();

  const { alerts, username } = useApp();

  const unread = alerts.filter((a) => !a.read).length;

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

        {/* Search */}

        <div className="relative w-[420px]">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search whispers..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2D5B50] outline-none"
          />

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Dark Mode */}

          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
          </button>

          {/* Notification */}

          <button
            onClick={() => navigate("/alerts")}
            className="relative w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <Bell size={20} />

            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {/* Settings */}

          <button
            onClick={() => navigate("/settings")}
            className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <Settings size={20}/>
          </button>

          {/* User */}

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 py-2 hover:bg-gray-200 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#2D5B50] text-white flex items-center justify-center font-bold">
              {username[0]}
            </div>

            <div className="text-left hidden md:block">
              <h3 className="font-semibold text-sm">
                {username}
              </h3>

              <p className="text-xs text-gray-500">
                Welcome Back 👋
              </p>
            </div>

          </button>

        </div>

      </div>

    </header>
  );
}