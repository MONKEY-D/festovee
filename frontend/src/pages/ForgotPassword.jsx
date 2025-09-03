import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/FESTOVEE_LOGO_ONLY.png";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const borderColor = "#ddd";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "bounce.out",
      });

      gsap.from(".form-field", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }, formRef);

    return () => ctx.revert();
  }, [step]);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log("Send OTP response:", result.data);
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log("Verify OTP response:", result.data);
      setStep(3);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log("Reset Password response:", result.data);
      navigate("/signin");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#fff9f6" }}
    >
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full opacity-30 animate-bounce-slow top-[-50px] left-[-50px]"></div>
        <div className="absolute w-80 h-80 bg-yellow-300 rounded-full opacity-30 animate-bounce-slow top-[150px] right-[-60px]"></div>
        <div className="absolute w-72 h-72 bg-green-300 rounded-full opacity-30 animate-bounce-slow bottom-[100px] left-[80px]"></div>
      </div>

      {/* Forgot Password Card */}
      <div
        ref={formRef}
        className="relative z-10 bg-[#faf9f6] rounded-xl shadow-2xl w-full max-w-md p-5 space-y-3"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Festovee Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Title */}
        <div className="text-center form-field">
          <p className="text-gray-800 font-extrabold text-lg">
            {step === 1 && "Forgot Password?"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Your Password"}
          </p>
          <p className="text-gray-500 text-sm">
            {step === 1 && "Enter your email to receive reset instructions."}
            {step === 2 && "Enter the OTP sent to your email."}
            {step === 3 && "Enter your new password."}
          </p>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div className="form-field">
            <label className="block text-gray-500 font-bold mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
            />
            <button
              className="mt-3 w-full py-2 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl active:shadow-md transform active:translate-y-1 transition-all duration-150"
              style={{ backgroundColor: "#ff4d2d", color: "#fff" }}
              onClick={handleSendOtp}
            >
              Send Reset OTP
            </button>
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div className="form-field">
            <label className="block text-gray-500 font-bold mb-1">OTP</label>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              placeholder="Enter OTP"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
            />
            <button
              className="mt-3 w-full py-2 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl active:shadow-md transform active:translate-y-1 transition-all duration-150"
              style={{ backgroundColor: "#ff4d2d", color: "#fff" }}
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <div className="form-field relative">
              <label className="block text-gray-500 font-bold mb-1">
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none pr-10"
                style={{ border: `1px solid ${borderColor}` }}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <div className="form-field relative">
              <label className="block text-gray-500 font-bold mb-1">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none pr-10"
                style={{ border: `1px solid ${borderColor}` }}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              className="mt-3 w-full py-2 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl active:shadow-md transform active:translate-y-1 transition-all duration-150"
              style={{ backgroundColor: "#ff4d2d", color: "#fff" }}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}

        {/* Back to Sign In */}
        <div className="text-center mt-2">
          <p className="text-gray-600">
            Remembered your password?{" "}
            <Link
              to="/signin"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(50px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
};

export default ForgotPassword;
