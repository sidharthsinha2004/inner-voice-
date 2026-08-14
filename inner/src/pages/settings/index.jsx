import { useState } from "react";

import {
  Settings as SettingsIcon,
  Moon,
  Bell,
  User,
  ShieldAlert,
  Check,
  Palette,
  LogOut,
  Save,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import ConfirmDialog from "../../components/ConfirmDialog";
import "./setting.css"


export default function Settings() {
  const {
    currentUser,
    updateProfile,
    logout,
    showToast,
  } = useAppData();

  const {
    isDark,
    accentColor,
    setAccentColor,
    accentPalettes,
  } = useTheme();


  const [name, setName] =
    useState(currentUser.name);

  const [bio, setBio] =
    useState(currentUser.bio);


  const [notifLikes, setNotifLikes] =
    useState(true);

  const [notifComments, setNotifComments] =
    useState(true);

  const [notifFollows, setNotifFollows] =
    useState(true);

  const [notifCommunity, setNotifCommunity] =
    useState(false);


  const [logoutOpen, setLogoutOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("appearance");


  /* =====================================================
     SAVE ACCOUNT
  ===================================================== */

  const handleSaveAccount = (e) => {
    e.preventDefault();

    const finalName =
      name.trim() || currentUser.name;

    updateProfile({
      name: finalName,
      initial: finalName
        .charAt(0)
        .toUpperCase(),
      bio: bio.trim(),
    });

    showToast(
      "Profile changes saved",
      "success"
    );
  };


  /* =====================================================
     SAVE NOTIFICATIONS
  ===================================================== */

  const handleSaveNotifications = (e) => {
    e.preventDefault();

    showToast(
      "Notification preferences saved",
      "success"
    );
  };


  const scrollToSection = (id) => {
    setActiveSection(id);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };


  return (
    <div className="settings-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="settings-header">

        <div className="settings-header-icon">
          <SettingsIcon size={21} />
        </div>

        <div>

          <span className="settings-eyebrow">
            INNERVOICE · PREFERENCES
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Personalize your InnerVoice experience.
          </p>

        </div>

      </header>


      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="settings-layout">


        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="settings-sidebar">

          <div className="settings-sidebar-title">
            SETTINGS
          </div>


          <button
            type="button"
            onClick={() =>
              scrollToSection("appearance")
            }
            className={
              activeSection === "appearance"
                ? "settings-nav active"
                : "settings-nav"
            }
          >
            <Palette size={16} />

            <span>
              Appearance
            </span>

            <ChevronRight size={14} />
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection("account")
            }
            className={
              activeSection === "account"
                ? "settings-nav active"
                : "settings-nav"
            }
          >
            <User size={16} />

            <span>
              Account
            </span>

            <ChevronRight size={14} />
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection("notifications")
            }
            className={
              activeSection === "notifications"
                ? "settings-nav active"
                : "settings-nav"
            }
          >
            <Bell size={16} />

            <span>
              Notifications
            </span>

            <ChevronRight size={14} />
          </button>


          <div className="settings-sidebar-divider" />


          <button
            type="button"
            onClick={() =>
              scrollToSection("danger")
            }
            className="settings-nav danger"
          >
            <ShieldAlert size={16} />

            <span>
              Danger Zone
            </span>

            <ChevronRight size={14} />
          </button>


          <div className="settings-sidebar-card">

            <Sparkles size={16} />

            <p>
              Your preferences are
              saved automatically
              across your session.
            </p>

          </div>

        </aside>


        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="settings-content">


          {/* =================================================
              APPEARANCE
          ================================================= */}

          <section
            id="appearance"
            className="settings-panel"
          >

            <div className="settings-panel-header">

              <div className="settings-panel-icon">
                <Palette size={17} />
              </div>

              <div>

                <span>
                  PERSONALIZATION
                </span>

                <h2>
                  Appearance
                </h2>

                <p>
                  Make InnerVoice feel like your own space.
                </p>

              </div>

            </div>


            {/* Theme */}

            <div className="settings-option">

              <div className="settings-option-icon">
                <Moon size={17} />
              </div>

              <div className="settings-option-info">

                <strong>
                  Dark mode
                </strong>

                <span>
                  {isDark
                    ? "Currently enabled"
                    : "Currently disabled"}
                </span>

              </div>

              <ThemeToggle />

            </div>


            {/* Accent */}

            <div className="settings-subsection">

              <div className="settings-subsection-heading">

                <div>

                  <strong>
                    Accent color
                  </strong>

                  <span>
                    Choose your interface highlight color.
                  </span>

                </div>

                <Palette size={16} />

              </div>


              <div className="accent-grid">

                {accentPalettes.map((p) => {

                  const selected =
                    p.id === accentColor;

                  return (

                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        setAccentColor(p.id)
                      }
                      className={
                        selected
                          ? "accent-choice selected"
                          : "accent-choice"
                      }
                      aria-pressed={selected}
                    >

                      <span
                        className="accent-color"
                        style={{
                          backgroundColor:
                            p.accent,
                        }}
                      >

                        {selected && (
                          <Check
                            size={15}
                            className="text-white"
                          />
                        )}

                      </span>

                      <span>
                        {p.name}
                      </span>

                    </button>

                  );
                })}

              </div>

            </div>

          </section>


          {/* =================================================
              ACCOUNT
          ================================================= */}

          <section
            id="account"
            className="settings-panel"
          >

            <div className="settings-panel-header">

              <div className="settings-panel-icon">
                <User size={17} />
              </div>

              <div>

                <span>
                  PROFILE
                </span>

                <h2>
                  Account
                </h2>

                <p>
                  Manage how other people see you.
                </p>

              </div>

            </div>


            {/* Profile preview */}

            <div className="settings-profile-preview">

              <div className="settings-profile-avatar">
                {(name ||
                  currentUser.name)
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <strong>
                  {name ||
                    currentUser.name}
                </strong>

                <span>
                  Your InnerVoice profile
                </span>

              </div>

            </div>


            <form
              onSubmit={handleSaveAccount}
              className="settings-form"
            >

              <div className="settings-field">

                <label>
                  Display name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                />

              </div>


              <div className="settings-field">

                <label>
                  Bio
                </label>

                <textarea
                  value={bio}
                  onChange={(e) =>
                    setBio(e.target.value)
                  }
                  rows={4}
                  placeholder="Tell people something about yourself..."
                />

              </div>


              <div className="settings-form-footer">

                <span>
                  Changes update your profile immediately.
                </span>

                <button
                  type="submit"
                  className="settings-primary-button"
                >
                  <Save size={15} />
                  Save Changes
                </button>

              </div>

            </form>

          </section>


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <section
            id="notifications"
            className="settings-panel"
          >

            <div className="settings-panel-header">

              <div className="settings-panel-icon">
                <Bell size={17} />
              </div>

              <div>

                <span>
                  ALERTS
                </span>

                <h2>
                  Notifications
                </h2>

                <p>
                  Decide what you want InnerVoice to notify you about.
                </p>

              </div>

            </div>


            <form
              onSubmit={handleSaveNotifications}
              className="notification-list"
            >

              <ToggleRow
                icon={<HeartIcon />}
                label="Likes on my posts"
                description="When someone likes something you shared."
                checked={notifLikes}
                onChange={setNotifLikes}
              />


              <ToggleRow
                icon={<Bell size={16} />}
                label="Comments on my posts"
                description="When someone responds to your thoughts."
                checked={notifComments}
                onChange={setNotifComments}
              />


              <ToggleRow
                icon={<User size={16} />}
                label="New followers"
                description="When someone starts following you."
                checked={notifFollows}
                onChange={setNotifFollows}
              />


              <ToggleRow
                icon={<Sparkles size={16} />}
                label="Community activity"
                description="Interesting activity and community updates."
                checked={notifCommunity}
                onChange={setNotifCommunity}
              />


              <div className="settings-form-footer notification-footer">

                <span>
                  You can change these preferences anytime.
                </span>

                <button
                  type="submit"
                  className="settings-primary-button"
                >
                  <Save size={15} />
                  Save Preferences
                </button>

              </div>

            </form>

          </section>


          {/* =================================================
              DANGER
          ================================================= */}

          <section
            id="danger"
            className="settings-danger-panel"
          >

            <div className="settings-danger-icon">
              <ShieldAlert size={18} />
            </div>

            <div className="settings-danger-info">

              <span>
                ACCOUNT SECURITY
              </span>

              <h2>
                Danger Zone
              </h2>

              <p>
                Logging out will end your current InnerVoice session.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                setLogoutOpen(true)
              }
              className="settings-logout-button"
            >
              <LogOut size={15} />
              Logout
            </button>

          </section>

        </main>

      </div>


      {/* =================================================
          CONFIRM
      ================================================= */}

      <ConfirmDialog
        open={logoutOpen}
        onClose={() =>
          setLogoutOpen(false)
        }
        onConfirm={logout}
        title="Log out of InnerVoice?"
        message="You can log back in anytime — your posts and bookmarks will be waiting for you."
        confirmLabel="Logout"
      />

    </div>
  );
}


/* =========================================================
   TOGGLE ROW
========================================================= */

function ToggleRow({
  icon,
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="notification-row">

      <div className="notification-icon">
        {icon}
      </div>

      <div className="notification-info">

        <strong>
          {label}
        </strong>

        <span>
          {description}
        </span>

      </div>


      <button
        type="button"
        onClick={() =>
          onChange(!checked)
        }
        className={
          checked
            ? "settings-switch active"
            : "settings-switch"
        }
        role="switch"
        aria-checked={checked}
      >

        <span />

      </button>

    </div>
  );
}


/* Small heart icon */

function HeartIcon() {
  return (
    <span style={{ fontSize: 15 }}>
      ♥
    </span>
  );
}