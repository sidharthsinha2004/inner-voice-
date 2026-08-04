import { useState } from "react";
import "./style2.css";

export default function ForgetPassword() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Only allow 10 digit Indian phone number
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setPhone(value);
    setError("");
    setSuccess(false);
  };

  // Format phone like 98765 43210
  const formatPhone = (value) => {
    if (value.length > 5) {
      return `${value.slice(0, 5)} ${value.slice(5)}`;
    }

    return value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[6-9]/.test(phone)) {
      setError("Please enter a valid Indian mobile number.");
      return;
    }

    try {
      setLoading(true);

      /*
        =========================================
        ADD YOUR BACKEND API HERE
        =========================================

        const response = await fetch(
          "http://localhost:3000/api/auth/forgot-password",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              phone: `+91${phone}`,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        // After success:
        // navigate("/verify-email");
      */

      // Temporary demo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="forgot-page">

      {/* Background decorations */}

      <div className="forgot-bg-circle forgot-bg-one"></div>
      <div className="forgot-bg-circle forgot-bg-two"></div>

      {/* =====================================
          MAIN CARD
      ====================================== */}

      <section className="forgot-card">

        {/* =====================================
            LEFT PANEL
        ====================================== */}

        <aside className="forgot-left">

          <div className="forgot-decoration decoration-one"></div>
          <div className="forgot-decoration decoration-two"></div>

          {/* Logo */}

          <a href="/" className="forgot-logo">
            Inner<span>Voice</span>
          </a>

          {/* Main Content */}

          <div className="forgot-left-content">

            <div className="forgot-lock-box">
              <LockIcon />
            </div>

            <span className="forgot-eyebrow">
              ACCOUNT RECOVERY
            </span>

            <h1>
              Forgot your
              <br />
              <span>password?</span>
            </h1>

            <p className="forgot-description">
              No worries. Enter the phone number linked to
              your account and we'll help you securely get
              back into your InnerVoice space.
            </p>

            {/* Privacy Card */}

            <div className="forgot-privacy-card">

              <div className="forgot-check">
                <ShieldIcon />
              </div>

              <div>
                <strong>Your privacy matters</strong>

                <p>
                  Your phone number stays private and is only
                  used for account verification.
                </p>
              </div>

            </div>

          </div>

          {/* Bottom text */}

          <p className="forgot-left-footer">
            Your space. Your thoughts. Your voice.
          </p>

        </aside>

        {/* =====================================
            RIGHT PANEL
        ====================================== */}

        <section className="forgot-right">

          {/* Mobile Logo */}

          <a href="/" className="forgot-mobile-logo">
            Inner<span>Voice</span>
          </a>

          {/* Small icon */}

          <div className="forgot-right-icon">
            <KeyIcon />
          </div>

          {/* Header */}

          <header className="forgot-header">

            <span className="forgot-step">
              ACCOUNT RECOVERY
            </span>

            <h2>Forgot your password?</h2>

            <p>
              Enter the phone number linked to your account.
              We'll send you a secure one-time verification
              code to continue.
            </p>

          </header>

          {/* =====================================
              FORM
          ====================================== */}

          <form
            className="forgot-form"
            onSubmit={handleSubmit}
            noValidate
          >

            <div className="forgot-input-group">

              <label htmlFor="phone">
                Phone number
              </label>

              <div
                className={`forgot-phone-input ${
                  error ? "phone-error" : ""
                }`}
              >

                <div className="country-code">
                  <span>+91</span>
                </div>

                <div className="phone-divider"></div>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="98765 43210"
                  value={formatPhone(phone)}
                  onChange={handlePhoneChange}
                  autoComplete="tel"
                />

                {/* Valid icon */}

                {phone.length === 10 &&
                  /^[6-9]/.test(phone) && (
                    <span className="phone-valid">
                      <CheckIcon />
                    </span>
                  )}

              </div>

              <div className="phone-info-row">

                <p>
                  We'll only use this number for account
                  verification.
                </p>

                {phone && (
                  <span className="phone-counter">
                    {phone.length}/10
                  </span>
                )}

              </div>

            </div>

            {/* Privacy information */}

            <div className="forgot-security-box">

              <div className="security-shield">
                <ShieldIcon />
              </div>

              <p>
                Your phone number remains private and won't
                be visible to other users.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="forgot-error">

                <span className="message-symbol">
                  !
                </span>

                <p>{error}</p>

              </div>
            )}

            {/* Success */}

            {success && (
              <div className="forgot-success">

                <span className="message-symbol">
                  <CheckIcon />
                </span>

                <div>
                  <strong>Verification code sent!</strong>

                  <p>
                    Check your phone for the verification
                    code.
                  </p>
                </div>

              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              className="forgot-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="forgot-loader"></span>

                  Sending code...
                </>
              ) : (
                <>
                  <span>
                    Send verification code
                  </span>

                  <span className="forgot-arrow">
                    <ArrowIcon />
                  </span>
                </>
              )}

            </button>

          </form>

          {/* Footer */}

          <footer className="forgot-footer">

            <LockIcon />

            <span>
              Secure account recovery
            </span>

          </footer>

        </section>

      </section>

    </main>
  );
}


/* =========================================
   ICON COMPONENTS
========================================= */

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="3"
      />

      <path d="M8 10V7a4 4 0 0 1 8 0v3" />

      <path d="M12 14v2" />
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l7 3v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3Z" />

      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}


function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}


function KeyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="8"
        cy="15"
        r="4"
      />

      <path d="m11 12 8-8" />

      <path d="m15 8 2 2" />

      <path d="m17 6 2 2" />
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />

      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}