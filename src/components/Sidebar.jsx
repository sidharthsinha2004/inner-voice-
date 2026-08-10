import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

import navItems from "../data/navItems";
import { useAppData } from "../context/AppDataContext";
import ConfirmDialog from "./ConfirmDialog";

export default function Sidebar() {
  const { logout } = useAppData();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <aside className="sticky top-24">
      <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800 p-5">
        <h2 className="text-lg font-bold text-[var(--accent)] dark:text-[var(--accent-text-dark)] mb-6">
          Navigation
        </h2>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--accent)] text-white shadow-md"
                      : "text-stone-700 dark:text-stone-200 hover:bg-[var(--accent-soft)] dark:hover:bg-stone-800 hover:text-[var(--accent)] dark:hover:text-[var(--accent-text-dark)]"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-stone-200 dark:border-stone-800 my-6" />

        {/* Logout */}
        <button
          onClick={() => setConfirmOpen(true)}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

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
