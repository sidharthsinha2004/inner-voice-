import { NavLink } from "react-router-dom";
import { LogOut, X } from "lucide-react";

import navItems from "../data/navItems";
import ThemeToggle from "./ThemeToggle";
import { useAppData } from "../context/AppDataContext";

export default function MobileMenu({ open, onClose, onLogoutClick }) {
  const { currentUser } = useAppData();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-90 lg:hidden">
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute left-0 top-0 h-full w-[78%] max-w-xs bg-white dark:bg-stone-900 shadow-2xl animate-fade-in flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-[#3B8069] to-[#5F8CAE] flex items-center justify-center text-white font-bold">
              {currentUser.initial}
            </div>
            <div>
              <p className="font-semibold text-stone-900 dark:text-stone-50 text-sm">
                {currentUser.name}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                View profile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            aria-label="Close menu"
          >
            <X size={20} className="text-stone-600 dark:text-stone-300" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-(--accent) text-white shadow-md"
                      : "text-stone-700 dark:text-stone-200 hover:bg-(--accent-soft) dark:hover:bg-stone-800 hover:text-(--accent) dark:hover:text-(--accent-text-dark)"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-stone-100 dark:border-stone-800 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
              Dark mode
            </span>
            <ThemeToggle />
          </div>

          <button
            onClick={() => {
              onClose();
              onLogoutClick();
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
