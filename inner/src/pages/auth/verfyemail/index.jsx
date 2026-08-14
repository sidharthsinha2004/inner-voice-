import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style3.css";

export default function VerifyEmail() {
  const OTP_LENGTH = 6;
  const navigate = useNavigate();

  const [otp, setOtp] = useState(
    Array(OTP_LENGTH).fill("")
  );

  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  // ==========================================
  // TIMER
  // ==========================================

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  // ==========================================
  // OTP INPUT
  // ==========================================

  const handleChange = (index, value) => {
    // Only allow numbers
    const number = value.replace(/\D/g, "");

    if (!number) {
      const updatedOtp = [...otp];

      updatedOtp[index] = "";

      setOtp(updatedOtp);

      setError("");
      setSuccess(false);

      return;
    }

    const updatedOtp = [...otp];

    updatedOtp[index] = number.slice(-1);

    setOtp(updatedOtp);

    setError("");
    setSuccess(false);

    // Move to next input
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ==========================================
  // BACKSPACE
  // ==========================================

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ==========================================
  // PASTE OTP
  // ==========================================

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedData) return;

    const updatedOtp = Array(OTP_LENGTH).fill("");

    pastedData.split("").forEach((number, index) => {
      updatedOtp[index] = number;
    });

    setOtp(updatedOtp);

    setError("");
    setSuccess(false);

    const nextIndex = Math.min(
      pastedData.length,
      OTP_LENGTH - 1
    );

    inputRefs.current[nextIndex]?.focus();
  };

  // ==========================================
  // VERIFY OTP
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const verificationCode = otp.join("");

    if (verificationCode.length !== OTP_LENGTH) {
      setError(
        "Please enter the complete 6-digit verification code."
      );

      return;
    }

    try {
      setLoading(true);

      /*
        ==========================================
        CONNECT YOUR BACKEND HERE
        ==========================================

        const response = await fetch(
          "http://localhost:3000/api/auth/verify-otp",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              otp: verificationCode,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Invalid verification code."
          );
        }

        // After OTP verification:
        // navigate("/reset-password");
      */

      // ------------------------------------------
      // TEMPORARY DEMO
      // Remove this when backend is connected
      // ------------------------------------------

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setSuccess(true);
      sessionStorage.setItem("innervoice_otp_verified", "true");

      // Go to Reset Password page after successful verification
      setTimeout(() => navigate("/reset-password"), 700);


    } catch (err) {
      setError(
        err.message ||
        "Invalid verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESEND OTP
  // ==========================================

  const handleResend = async () => {
    if (seconds > 0 || resending) return;

    try {
      setResending(true);

      setError("");
      setSuccess(false);

      /*
        ==========================================
        RESEND OTP API
        ==========================================

        const response = await fetch(
          "http://localhost:3000/api/auth/resend-otp",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to resend verification code."
          );
        }
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setOtp(Array(OTP_LENGTH).fill(""));

      setSeconds(30);

      inputRefs.current[0]?.focus();

    } catch (err) {
      setError(
        err.message ||
        "Unable to resend verification code."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="verify-page">

      {/* Background effects */}

      <div className="verify-bg verify-bg-one"></div>
      <div className="verify-bg verify-bg-two"></div>

      {/* ==========================================
          MAIN CARD
      ========================================== */}

      <section className="verify-card">

        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <aside className="verify-left">

          {/* Decorative circles */}

          <div className="verify-circle circle-one"></div>
          <div className="verify-circle circle-two"></div>

          {/* Logo */}

          <a
            href="/"
            className="verify-logo"
          >
            Inner<span>Voice</span>
          </a>

          {/* Content */}

          <div className="verify-left-content">

            <div className="verify-left-icon">
              <MailShieldIcon />
            </div>

            <span className="verify-eyebrow">
              IDENTITY VERIFICATION
            </span>

            <h1>
              One small step
              <br />
              to know it's <span>you.</span>
            </h1>

            <p className="verify-description">
              We've sent a secure verification code to the
              phone number linked to your InnerVoice
              account.
            </p>

            {/* Information card */}

            <div className="verify-info-card">

              <div className="verify-info-icon">
                <ShieldIcon />
              </div>

              <div>
                <strong>
                  Secure verification
                </strong>

                <p>
                  Your one-time code helps us confirm that
                  this account really belongs to you.
                </p>
              </div>

            </div>

          </div>

          {/* Footer */}

          <p className="verify-left-footer">
            Your space. Your thoughts. Your voice.
          </p>

        </aside>

        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <section className="verify-right">

          {/* Mobile logo */}

          <a
            href="/"
            className="verify-mobile-logo"
          >
            Inner<span>Voice</span>
          </a>

          {/* Icon */}

          <div className="verify-right-icon">
            <ShieldIcon />
          </div>

          {/* Heading */}

          <header className="verify-header">

            <span className="verify-step">
              VERIFICATION
            </span>

            <h2>
              Enter verification code
            </h2>

            <p>
              We've sent a 6-digit code to your registered
              phone number.
            </p>

          </header>

          {/* ==========================================
              FORM
          ========================================== */}

          <form
            className="verify-form"
            onSubmit={handleSubmit}
            noValidate
          >

            <div className="otp-section">

              <div className="otp-label-row">

                <label>
                  Verification code
                </label>

                <span>
                  6 digits
                </span>

              </div>

              {/* OTP BOXES */}

              <div
                className="otp-container"
                onPaste={handlePaste}
              >

                {otp.map((number, index) => (

                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] =
                        element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={number}
                    autoComplete={
                      index === 0
                        ? "one-time-code"
                        : "off"
                    }
                    aria-label={`Verification digit ${index + 1
                      }`}
                    onChange={(e) =>
                      handleChange(
                        index,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    className={
                      number
                        ? "otp-filled"
                        : ""
                    }
                  />

                ))}

              </div>

              <p className="otp-help">
                Enter the code we sent to your phone.
              </p>

            </div>

            {/* ==========================================
                SECURITY BOX
            ========================================== */}

            <div className="verify-security-box">

              <div className="security-icon">
                <LockIcon />
              </div>

              <p>
                Never share your verification code with
                anyone. InnerVoice will never ask for it
                outside this page.
              </p>

            </div>

            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (

              <div className="verify-error">

                <span>
                  !
                </span>

                <p>
                  {error}
                </p>

              </div>

            )}

            {/* ==========================================
                SUCCESS
            ========================================== */}

            {success && (

              <div className="verify-success">

                <span>
                  <CheckIcon />
                </span>

                <div>
                  <strong>
                    Verification successful
                  </strong>

                  <p>
                    You can now create your new password.
                  </p>
                </div>

              </div>

            )}

            {/* ==========================================
                VERIFY BUTTON
            ========================================== */}

            <button
              type="submit"
              className="verify-submit"
              disabled={loading}
            >

              {loading ? (

                <>
                  <span className="verify-loader"></span>

                  Verifying...
                </>

              ) : (

                <>
                  <span>
                    Verify & continue
                  </span>

                  <span className="verify-arrow">
                    <ArrowIcon />
                  </span>
                </>

              )}

            </button>

          </form>

          {/* ==========================================
              RESEND
          ========================================== */}

          <div className="resend-section">

            <p>
              Didn't receive the code?
            </p>

            {seconds > 0 ? (

              <span className="resend-timer">
                Resend in{" "}
                <strong>
                  00:{String(seconds).padStart(2, "0")}
                </strong>
              </span>

            ) : (

              <button
                type="button"
                className="resend-button"
                onClick={handleResend}
                disabled={resending}
              >
                {resending
                  ? "Sending..."
                  : "Resend code"}
              </button>

            )}

          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <footer className="verify-footer">

            <ShieldIcon />

            <span>
              Secure account recovery
            </span>

            <span className="verify-footer-dot">
              •
            </span>

            <span>
              InnerVoice
            </span>

          </footer>

        </section>

      </section>

    </main>
  );
}


/* ==========================================
   ICONS
========================================== */

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


function MailShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="3"
      />

      <path d="m4 7 8 6 8-6" />

      <path d="M12 16h.01" />
    </svg>
  );
}