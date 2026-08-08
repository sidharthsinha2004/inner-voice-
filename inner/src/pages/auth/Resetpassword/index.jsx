import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style4.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Password strength
  const getStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getStrength();

  const strengthText = ["", "Weak", "Fair", "Good", "Strong"];

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(false);

    if (!password || !confirmPassword) {
      setMessage("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (strength < 3) {
      setMessage(
        "Please use a stronger password with uppercase letters, numbers and symbols."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // API call will go here later
    console.log("New Password:", password);

    setMessage("Your password has been reset successfully.");
    setSuccess(true);

    // Go to Profile page after 1.5 seconds
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    // Example:
    // navigate("/login");
  };

  return (
    <main className="reset-page">
      {/* Background decorations */}
      <div className="reset-blob blob-one"></div>
      <div className="reset-blob blob-two"></div>
      <div className="reset-grid"></div>

      <section className="reset-container">
        {/* LEFT SIDE */}
        <div className="reset-intro">
          <a href="/" className="reset-logo">
            Inner<span>Voice</span>
          </a>

          <div className="intro-content">
            <div className="mini-lock">
              <LockIcon />
            </div>

            <p className="eyebrow">ACCOUNT SECURITY</p>

            <h1>
              Create a password
              <br />
              that’s <span>just yours.</span>
            </h1>

            <p className="intro-text">
              Your conversations deserve privacy. Choose a strong password
              to keep your InnerVoice account safe and secure.
            </p>

            <div className="security-point">
              <div className="check-circle">✓</div>

              <div>
                <strong>Private by design</strong>
                <p>Your password is used only to protect your account.</p>
              </div>
            </div>
          </div>

          <p className="intro-footer">
            Your space. Your thoughts. Your voice.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="reset-form-side">
          <div className="mobile-logo">
            Inner<span>Voice</span>
          </div>

          <div className="form-header">
            <span className="step-badge">FINAL STEP</span>

            <h2>Reset password</h2>

            <p>
              Enter your new password below to regain access to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="reset-form">
            {/* NEW PASSWORD */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">New password</label>

                {password && (
                  <span className={`strength-name strength-${strength}`}>
                    {strengthText[strength]}
                  </span>
                )}
              </div>

              <div className="input-wrapper">
                <span className="input-icon">
                  <LockIcon />
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a new password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show or hide password"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* Strength bars */}
              <div className="strength-container">
                <div
                  className={`strength-bar ${strength >= 1 ? `active level-${strength}` : ""
                    }`}
                ></div>

                <div
                  className={`strength-bar ${strength >= 2 ? `active level-${strength}` : ""
                    }`}
                ></div>

                <div
                  className={`strength-bar ${strength >= 3 ? `active level-${strength}` : ""
                    }`}
                ></div>

                <div
                  className={`strength-bar ${strength >= 4 ? `active level-${strength}` : ""
                    }`}
                ></div>
              </div>

              <p className="password-hint">
                Use 8+ characters with uppercase, numbers & symbols.
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>

              <div
                className={`input-wrapper ${confirmPassword
                    ? passwordsMatch
                      ? "input-success"
                      : "input-error"
                    : ""
                  }`}
              >
                <span className="input-icon">
                  <LockIcon />
                </span>

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setMessage("");
                  }}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label="Show or hide confirm password"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {confirmPassword && (
                <p
                  className={
                    passwordsMatch ? "match-text" : "not-match-text"
                  }
                >
                  {passwordsMatch
                    ? "✓ Passwords match"
                    : "Passwords don't match"}
                </p>
              )}
            </div>

            {/* MESSAGE */}
            {message && (
              <div
                className={`form-message ${success ? "success-message" : "error-message"
                  }`}
              >
                <span>{success ? "✓" : "!"}</span>
                {message}
              </div>
            )}

            {/* BUTTON */}
            <button type="submit" className="reset-button">
              <span>Reset my password</span>

              <span className="arrow">
                <ArrowIcon />
              </span>
            </button>
          </form>

          <div className="secure-footer">
            <ShieldIcon />

            <span>Secure account recovery</span>

            <span className="dot">•</span>

            <span>InnerVoice</span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------
   ICON COMPONENTS
------------------------- */

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="5" y="10" width="14" height="10" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
      <path d="M9.5 5.4A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-2.1 2.9" />
      <path d="M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3l7 3v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
    
  );
}
