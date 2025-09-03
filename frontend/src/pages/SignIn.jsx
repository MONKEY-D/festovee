import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import logo from "../assets/FESTOVEE_LOGO_ONLY.png";
import { SiGoogle } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import Loading from "../components/Loading";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ fixed typo

  // 🔹 Handle SignIn
  const handleSignIn = async () => {
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter your email address before signing in.",
        confirmButtonColor: "#ff4d2d",
      });
    }
    if (!password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Password",
        text: "Please enter your password before signing in.",
        confirmButtonColor: "#ff4d2d",
      });
    }

    try {
      setLoading(true); // show loader

      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back to Festovee!",
        confirmButtonColor: "#ff4d2d",
        timer: 2000,
        showConfirmButton: false,
      });

      console.log(result);
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "Invalid credentials. Please try again.",
        confirmButtonColor: "#ff4d2d",
      });
      console.error(error);
    } finally {
      setLoading(false); // hide loader
    }
  };

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
  }, []);

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      setLoading(true); // show loader

      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      console.log(data);

      Swal.fire({
        icon: "success",
        title: "Google Sign-In Successful",
        text: "Welcome to Festovee!",
        confirmButtonColor: primaryColor,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Google Sign-Up Failed",
        text: "Unable to sign up with Google. Please try again.",
        confirmButtonColor: primaryColor,
      });
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#fff9f6" }}
    >
      {/* Loader */}
      {loading && <Loading message="Signing you in..." />}

      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full opacity-30 animate-bounce-slow top-[-50px] left-[-50px]"></div>
        <div className="absolute w-80 h-80 bg-yellow-300 rounded-full opacity-30 animate-bounce-slow top-[150px] right-[-60px]"></div>
        <div className="absolute w-72 h-72 bg-green-300 rounded-full opacity-30 animate-bounce-slow bottom-[100px] left-[80px]"></div>
      </div>

      {/* SignIn Form */}
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
          <p className="text-gray-800 font-extrabold">Sign In to Festovee</p>
        </div>

        {/* Email */}
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
        </div>

        {/* Password */}
        <div className="form-field">
          <label className="block text-gray-500 font-bold mb-1">Password</label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="text-right mt-1">
            <button
              className="text-sm text-blue-500 font-bold hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:shadow-md transform active:translate-y-1 transition-all duration-150"
          style={{
            backgroundColor: "#ff4d2d",
            border: "1px solid #ddd",
            color: "#fff",
          }}
          onClick={handleSignIn}
        >
          Sign In
        </button>

        {/* Google SignIn */}
        <button
          className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 shadow-xl hover:shadow-xl active:shadow-md transform active:translate-y-1 transition-all duration-150"
          style={{ backgroundColor: "#fff", border: "2px solid #ddd" }}
          onClick={handleGoogleAuth}
        >
          <SiGoogle size={20} color="#ff4d2d" />
          Sign In with Google
        </button>

        {/* Switch to SignUp */}
        <div className="text-center mt-2">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Background Animation */}
      <style>
        {`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(50px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
}

export default SignIn;
