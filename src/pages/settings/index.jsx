import { useState } from "react";
import { Settings as SettingsIcon, Moon, Bell, User, ShieldAlert, Check } from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function Settings() {
  const { currentUser, updateProfile, logout, showToast } = useAppData();
  const { isDark, accentColor, setAccentColor, accentPalettes } = useTheme();

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);

  const [notifLikes, setNotifLikes] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifFollows, setNotifFollows] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(false);

  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleSaveAccount = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || currentUser.name,
      initial: (name.trim() || currentUser.name).charAt(0).toUpperCase(),
      bio: bio.trim(),
    });
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    showToast("Notification preferences saved", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={24} />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
          Settings
        </h1>
      </div>

      {/* Appearance */}
      <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Moon size={18} className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" />
          <h2 className="font-bold text-stone-900 dark:text-stone-50">
            Appearance
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-700 dark:text-stone-200">
              Dark mode
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {isDark ? "Currently on" : "Currently off"} — applies across the
              whole app.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="border-t border-stone-100 dark:border-stone-800 mt-5 pt-5">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-1">
            Accent color
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
            Pick the color used for buttons, links, and highlights.
          </p>

          <div className="flex flex-wrap gap-3">
            {accentPalettes.map((p) => {
              const selected = p.id === accentColor;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setAccentColor(p.id)}
                  className="group flex flex-col items-center gap-1.5"
                  aria-pressed={selected}
                  aria-label={`Use ${p.name} accent color`}
                  title={p.name}
                >
                  <span
                    className={`h-9 w-9 rounded-full flex items-center justify-center ring-2 ring-offset-2 ring-offset-white dark:ring-offset-stone-900 transition ${
                      selected
                        ? "ring-stone-400 dark:ring-stone-500"
                        : "ring-transparent group-hover:ring-stone-200 dark:group-hover:ring-stone-700"
                    }`}
                    style={{ backgroundColor: p.accent }}
                  >
                    {selected && <Check size={16} className="text-white" />}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" />
          <h2 className="font-bold text-stone-900 dark:text-stone-50">
            Account
          </h2>
        </div>

        <form onSubmit={handleSaveAccount} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
              Display name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 border border-transparent focus:border-[var(--accent)] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 border border-transparent focus:border-[var(--accent)] transition resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* Notifications */}
      <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" />
          <h2 className="font-bold text-stone-900 dark:text-stone-50">
            Notifications
          </h2>
        </div>

        <form onSubmit={handleSaveNotifications} className="space-y-1">
          <ToggleRow
            label="Likes on my posts"
            checked={notifLikes}
            onChange={setNotifLikes}
          />
          <ToggleRow
            label="Comments on my posts"
            checked={notifComments}
            onChange={setNotifComments}
          />
          <ToggleRow
            label="New followers"
            checked={notifFollows}
            onChange={setNotifFollows}
          />
          <ToggleRow
            label="Community activity"
            checked={notifCommunity}
            onChange={setNotifCommunity}
          />

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </section>

      {/* Danger zone */}
      <section className="bg-white dark:bg-stone-900 border border-red-200 dark:border-red-500/30 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert size={18} className="text-red-500" />
          <h2 className="font-bold text-stone-900 dark:text-stone-50">
            Danger Zone
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-700 dark:text-stone-200">
              Log out of InnerVoice
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              You can always log back in.
            </p>
          </div>
          <button
            onClick={() => setLogoutOpen(true)}
            className="px-4 py-2.5 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </section>

      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={logout}
        title="Log out of InnerVoice?"
        message="You can log back in anytime — your posts and bookmarks will be waiting for you."
        confirmLabel="Logout"
      />
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm text-stone-700 dark:text-stone-200">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
          checked ? "bg-[var(--accent)]" : "bg-stone-300 dark:bg-stone-700"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
