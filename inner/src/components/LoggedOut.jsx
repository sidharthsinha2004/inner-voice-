import { ShieldCheck, Sparkles, LogIn } from "lucide-react";
import "./LoggedOut.css";

export default function LoggedOut({ currentUser, onLogin }) {
  const firstName =
    currentUser?.name?.split(" ")[0] || "there";

  return (
    <main className="iv-logged-out-page">
      <div className="iv-logged-out-container">

        {/* BRAND */}
        <div className="iv-logged-out-brand">
          <div className="iv-logged-out-logo">
            IV
          </div>

          <div className="iv-logged-out-brand-text">
            <strong>InnerVoice</strong>
            <span>Express. Connect. Inspire.</span>
          </div>
        </div>

        {/* CARD */}
        <section className="iv-logged-out-card">

          {/* ICON */}
          <div className="iv-logged-out-icon-wrap">
            <div className="iv-logged-out-icon">
              <LogIn size={28} strokeWidth={2} />
            </div>

            <Sparkles
              className="iv-logged-out-sparkle"
              size={17}
              strokeWidth={2}
            />
          </div>

          {/* LABEL */}
          <span className="iv-logged-out-label">
            SESSION ENDED
          </span>

          {/* HEADING */}
          <h1 className="iv-logged-out-heading">
            You've been
            <span>logged out.</span>
          </h1>

          {/* MESSAGE */}
          <p className="iv-logged-out-message">
            No worries, {firstName}. Your thoughts,
            posts and bookmarks are safe.
          </p>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            className="iv-logged-out-login"
            onClick={onLogin}
          >
            <span className="iv-login-icon">
              <LogIn size={18} />
            </span>

            <span>
              Log back in
            </span>

            <span className="iv-login-arrow">
              →
            </span>
          </button>

          {/* SECURITY */}
          <div className="iv-logged-out-security">

            <div className="iv-security-icon">
              <ShieldCheck
                size={18}
                strokeWidth={2}
              />
            </div>

            <div>
              <strong>
                Your account is safe
              </strong>

              <span>
                Your data stays exactly where
                you left it.
              </span>
            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="iv-logged-out-footer">
          <span>© 2026 InnerVoice</span>
          <span className="iv-footer-dot">•</span>
          <span>Made for meaningful voices</span>
        </footer>

      </div>
    </main>
  );
}