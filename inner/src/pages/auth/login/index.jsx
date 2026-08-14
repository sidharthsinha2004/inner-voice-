import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppData } from "../../../context/AppDataContext";
import "./Style1.css";

import loginBg from "../../../assets/login-bg.jpeg";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAppData();

  const [activeTab, setActiveTab] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* =====================================================
     SIGNUP STEPS

     phone
       ↓
     otp
       ↓
     password
  ===================================================== */

  const [signupStep, setSignupStep] = useState("phone");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const otpInputs = useRef([]);

  /* =====================================================
     LOGIN
     EMAIL OR PHONE
  ===================================================== */

  const handleLogin = async (e) => {
    e.preventDefault();

    const identifier =
      e.target.identifier?.value?.trim();

    const password =
      e.target.password?.value || "";

    if (!identifier || !password) {
      alert(
        "Please enter your email/phone and password."
      );
      return;
    }

    /*
     * EMAIL VALIDATION
     */

    const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        identifier
      );

    /*
     * PHONE VALIDATION
     */

    const phoneDigits =
      identifier.replace(/\D/g, "");

    const isPhone =
      /^[+]?[0-9\s()-]{10,15}$/.test(
        identifier
      ) &&
      phoneDigits.length >= 10 &&
      phoneDigits.length <= 15;

    /*
     * INVALID LOGIN IDENTIFIER
     */

    if (!isEmail && !isPhone) {
      alert(
        "Please enter a valid email address or phone number."
      );
      return;
    }

    /*
     * LOGIN TYPE
     */

    const loginType = isEmail
      ? "email"
      : "phone";

    console.log("Login submitted:", {
      identifier,
      loginType,
      password,
    });

    /*
    =====================================================
    BACKEND API
    =====================================================

    const response = await fetch(
      "/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          identifier,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }
    */

    /*
     * FRONTEND LOGIN
     */

    login();

    const destination =
      location.state?.from || "/";

    navigate(destination, {
      replace: true,
    });
  };

  /* =====================================================
     SEND OTP
  ===================================================== */

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    console.log(
      "Send OTP to:",
      phoneNumber
    );

    /*
      BACKEND OTP API CAN BE ADDED HERE
    */

    setSignupStep("otp");
  };

  /* =====================================================
     OTP INPUT
  ===================================================== */

  const handleOtpChange = (
    value,
    index
  ) => {
    if (!/^[0-9]?$/.test(value)) {
      return;
    }

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (
      value &&
      index < 5
    ) {
      otpInputs.current[
        index + 1
      ]?.focus();
    }
  };

  /* =====================================================
     OTP BACKSPACE
  ===================================================== */

  const handleOtpKeyDown = (
    e,
    index
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      otpInputs.current[
        index - 1
      ]?.focus();
    }
  };

  /* =====================================================
     OTP PASTE
  ===================================================== */

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pastedOtp =
      e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedOtp) {
      return;
    }

    const updatedOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pastedOtp
      .split("")
      .forEach((number, index) => {
        updatedOtp[index] = number;
      });

    setOtp(updatedOtp);

    const focusIndex =
      Math.min(
        pastedOtp.length,
        5
      );

    otpInputs.current[
      focusIndex
    ]?.focus();
  };

  /* =====================================================
     VERIFY OTP
  ===================================================== */

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    const finalOtp =
      otp.join("");

    if (finalOtp.length !== 6) {
      alert(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    console.log(
      "Verify OTP:",
      finalOtp
    );

    setSignupStep("password");
  };

  /* =====================================================
     RESEND OTP
  ===================================================== */

  const handleResendOtp = () => {
    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    console.log(
      "Resend OTP to:",
      phoneNumber
    );

    otpInputs.current[0]?.focus();
  };

  /* =====================================================
     CREATE ACCOUNT
  ===================================================== */

  const handleCreateAccount = (e) => {
    e.preventDefault();

    const password =
      e.target.signupPassword.value;

    const confirmPassword =
      e.target.confirmPassword.value;

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    if (password.length < 8) {
      alert(
        "Password must contain at least 8 characters."
      );
      return;
    }

    console.log({
      phoneNumber,
      password,
    });

    login();

    alert(
      "Account created successfully!"
    );

    navigate("/", {
      replace: true,
    });
  };

  /* =====================================================
     SWITCH TAB
  ===================================================== */

  const changeTab = (tab) => {
    setActiveTab(tab);

    if (tab === "signup") {
      setSignupStep("phone");

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);
    }
  };

  return (
    <div className="auth-page">

      {/* =================================================
          LEFT IMAGE
      ================================================= */}

      <div
        className="auth-left"
        style={{
          backgroundImage:
            `url(${loginBg})`,
        }}
      >
        <div className="image-overlay" />

        <div className="left-content">

          <h1>
            Speak freely.
            <br />

            Stay anonymous.
            <br />

            <span>
              Stay safe.
            </span>
          </h1>

          <p>
            A private space designed for
            honest conversations, without
            giving up who you are.
          </p>

        </div>
      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="login-page">

        <div className="login-container">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="login-header">

            <h1>

              {activeTab === "login" &&
                "Welcome back"}

              {activeTab === "signup" &&
                signupStep === "phone" &&
                "Create your identity"}

              {activeTab === "signup" &&
                signupStep === "otp" &&
                "Verify your phone"}

              {activeTab === "signup" &&
                signupStep === "password" &&
                "Secure your identity"}

            </h1>

            <p>

              {activeTab === "login" &&
                "Sign in with your email or phone number."}

              {activeTab === "signup" &&
                signupStep === "phone" &&
                "Enter your phone number to get started."}

              {activeTab === "signup" &&
                signupStep === "otp" &&
                "Enter the 6-digit verification code sent to your phone."}

              {activeTab === "signup" &&
                signupStep === "password" &&
                "Create a strong password to protect your identity."}

            </p>

          </div>


          {/* =================================================
              TABS
          ================================================= */}

          <div className="login-tabs">

            <button
              type="button"
              className={
                activeTab === "login"
                  ? "tab active"
                  : "tab"
              }
              onClick={() =>
                changeTab("login")
              }
            >
              Log in
            </button>

            <button
              type="button"
              className={
                activeTab === "signup"
                  ? "tab active"
                  : "tab"
              }
              onClick={() =>
                changeTab("signup")
              }
            >
              Sign up
            </button>

          </div>


          {/* =================================================
              LOGIN FORM
              EMAIL + PHONE
          ================================================= */}

          {activeTab === "login" && (

            <form
              className="login-form"
              onSubmit={handleLogin}
            >

              {/* EMAIL OR PHONE */}

              <div className="form-group">

                <label htmlFor="loginIdentifier">
                  Email or phone number
                </label>

                <input
                  type="text"
                  id="loginIdentifier"
                  name="identifier"
                  placeholder="you@example.com or +91 98765 43210"
                  autoComplete="username"
                  required
                />

                <p className="input-hint">
                  Use the email or phone number
                  linked to your identity.
                </p>

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="loginPassword">
                  Password
                </label>

                <div className="password-box">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="loginPassword"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="eye-button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3l18 18" />

                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />

                        <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c6 0 10 8 10 8a18 18 0 0 1-2.1 3.1" />

                        <path d="M6.6 6.6C3.8 8.4 2 12 2 12s4 8 10 8a9.7 9.7 0 0 0 5.4-1.6" />
                      </svg>

                    ) : (

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />

                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>

                    )}

                  </button>

                </div>

              </div>


              {/* LOGIN OPTIONS */}

              <div className="login-options">

                <label className="remember">

                  <input
                    type="checkbox"
                    name="remember"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    navigate(
                      "/forget-password"
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="continue-button"
              >
                Continue anonymously
              </button>

            </form>
          )}


          {/* =================================================
              SIGNUP STEP 1
          ================================================= */}

          {activeTab === "signup" &&
            signupStep === "phone" && (

              <form
                className="login-form"
                onSubmit={handleSendOtp}
              >

                <div className="signup-step">

                  <span className="step active">
                    1
                  </span>

                  <span className="step-line" />

                  <span className="step">
                    2
                  </span>

                  <span className="step-line" />

                  <span className="step">
                    3
                  </span>

                </div>


                <div className="form-group">

                  <label htmlFor="signupPhone">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    id="signupPhone"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>


                <p className="signup-info">
                  We'll send you a one-time
                  verification code. Your phone
                  number stays private.
                </p>


                <button
                  type="submit"
                  className="continue-button"
                >
                  Get OTP
                </button>

              </form>
            )}


          {/* =================================================
              SIGNUP STEP 2
          ================================================= */}

          {activeTab === "signup" &&
            signupStep === "otp" && (

              <form
                className="login-form otp-signup-form"
                onSubmit={handleVerifyOtp}
              >

                <div className="signup-step">

                  <span className="step completed">
                    ✓
                  </span>

                  <span className="step-line completed" />

                  <span className="step active">
                    2
                  </span>

                  <span className="step-line" />

                  <span className="step">
                    3
                  </span>

                </div>


                <div className="phone-sent">

                  <span>
                    Code sent to
                  </span>

                  <strong>
                    {phoneNumber}
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      setSignupStep("phone")
                    }
                  >
                    Change
                  </button>

                </div>


                <div
                  className="signup-otp-inputs"
                  onPaste={handleOtpPaste}
                >

                  {otp.map(
                    (number, index) => (

                      <input
                        key={index}
                        ref={(element) => {
                          otpInputs.current[index] =
                            element;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength="1"
                        value={number}
                        onChange={(e) =>
                          handleOtpChange(
                            e.target.value,
                            index
                          )
                        }
                        onKeyDown={(e) =>
                          handleOtpKeyDown(
                            e,
                            index
                          )
                        }
                        autoFocus={
                          index === 0
                        }
                        aria-label={
                          `OTP digit ${index + 1}`
                        }
                      />

                    )
                  )}

                </div>


                <div className="signup-resend">

                  <span>
                    Didn't receive the code?
                  </span>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </button>

                </div>


                <button
                  type="submit"
                  className="continue-button"
                >
                  Verify OTP
                </button>

              </form>
            )}


          {/* =================================================
              SIGNUP STEP 3
          ================================================= */}

          {activeTab === "signup" &&
            signupStep === "password" && (

              <form
                className="login-form"
                onSubmit={
                  handleCreateAccount
                }
              >

                <div className="signup-step">

                  <span className="step completed">
                    ✓
                  </span>

                  <span className="step-line completed" />

                  <span className="step completed">
                    ✓
                  </span>

                  <span className="step-line completed" />

                  <span className="step active">
                    3
                  </span>

                </div>


                <div className="form-group">

                  <label htmlFor="signupPassword">
                    Create password
                  </label>

                  <div className="password-box">

                    <input
                      type={
                        showSignupPassword
                          ? "text"
                          : "password"
                      }
                      id="signupPassword"
                      name="signupPassword"
                      placeholder="Create a strong password"
                      minLength="8"
                      required
                    />

                    <button
                      type="button"
                      className="eye-button"
                      onClick={() =>
                        setShowSignupPassword(
                          !showSignupPassword
                        )
                      }
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    </button>

                  </div>

                </div>


                <div className="form-group">

                  <label htmlFor="confirmPassword">
                    Confirm password
                  </label>

                  <div className="password-box">

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter password again"
                      minLength="8"
                      required
                    />

                    <button
                      type="button"
                      className="eye-button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    </button>

                  </div>

                </div>


                <p className="password-hint">
                  Use at least 8 characters for
                  a stronger password.
                </p>


                <button
                  type="submit"
                  className="continue-button"
                >
                  Create anonymous identity
                </button>

              </form>
            )}


          {/* =================================================
              GOOGLE
          ================================================= */}

          <div className="divider">
            <span />
            <p>or</p>
            <span />
          </div>


          <button
            type="button"
            className="google-button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.24a4.48 4.48 0 0 1-1.94 2.94v2.51h3.14c1.84-1.69 2.91-4.18 2.91-7.27z"
              />

              <path
                fill="#34A853"
                d="M12 21.75c2.62 0 4.82-.87 6.43-2.35l-3.14-2.51c-.87.58-1.98.93-3.29.93-2.53 0-4.68-1.71-5.45-4.01H3.31v2.59A9.75 9.75 0 0 0 12 21.75z"
              />

              <path
                fill="#FBBC05"
                d="M6.55 13.81a5.86 5.86 0 0 1 0-3.62V7.6H3.31a9.76 9.76 0 0 0 0 8.8l3.24-2.59z"
              />

              <path
                fill="#EA4335"
                d="M12 6.18c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.82 3.27 14.62 2.25 12 2.25A9.75 9.75 0 0 0 3.31 7.6l3.24 2.59C7.32 7.89 9.47 6.18 12 6.18z"
              />
            </svg>

            Continue with Google
          </button>


          {/* =================================================
              BOTTOM SWITCH
          ================================================= */}

          <div className="bottom-switch">

            {activeTab === "login" ? (
              <>
                <span>
                  New here?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    changeTab("signup")
                  }
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <span>
                  Already have an identity?
                </span>

                <button
                  type="button"
                  onClick={() =>
                    changeTab("login")
                  }
                >
                  Log in
                </button>
              </>
            )}

          </div>


          {/* =================================================
              TERMS
          ================================================= */}

          <p className="terms">
            By continuing you agree to our
            community rules. We never sell
            data, ever.
          </p>

        </div>
      </div>

    </div>
  );
}