import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import logo from "../assets/FESTOVEE_LOGO_ONLY.png"; // Import the logo
import { SiGoogle } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const formRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bounce the entire form
      gsap.from(formRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "bounce.out",
      });

      // Staggered fade-in for fields
      gsap.from(".form-field", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // Button pop-in effect
      // gsap.from(".submit-btn", {
      //   scale: 0.8,
      //   opacity: 0,
      //   duration: 0.8,
      //   delay: 1,
      //   ease: "back.out(1.7)",
      // });
    }, formRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#fff9f6" }}
    >
      {/* Floating Particles / Blobs Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full opacity-30 animate-bounce-slow top-[-50px] left-[-50px]"></div>
        <div className="absolute w-80 h-80 bg-yellow-300 rounded-full opacity-30 animate-bounce-slow top-[150px] right-[-60px]"></div>
        <div className="absolute w-72 h-72 bg-green-300 rounded-full opacity-30 animate-bounce-slow bottom-[100px] left-[80px]"></div>
      </div>

      {/* SignUp Form */}
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
          {/* <h1
            className="text-3xl font-bold mb-2"
            style={{ color: primaryColor }}
          >
            FESTOVEE
          </h1> */}
          <p className="text-gray-800 font-extrabold">
            Get started with Festovee
          </p>
        </div>

        {/* Full Name */}
        <div className="form-field">
          <label className="block text-gray-500 font-bold mb-0">
            Full Name
          </label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Enter your full name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-non"
            style={{ border: `1px solid ${borderColor}` }}
          />
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

        {/* Mobile */}
        <div className="form-field">
          <label className="block text-gray-500 font-bold mb-1">Mobile</label>
          <input
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            type="tel"
            placeholder="Enter your mobile number"
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
            <button className="text-sm text-blue-500 font-bold hover:underline">
              Forgot password?
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="mb-3">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? {
                        backgroundColor: primaryColor,
                        color: "white",
                        borderColor: primaryColor,
                      }
                    : {
                        border: `1px solid ${borderColor}`,
                        color: "#333",
                        backgroundColor: "white",
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:shadow-md transform active:translate-y-1 transition-all duration-150"
          style={{
            backgroundColor: "#ff4d2d",
            border: "1px solid #ddd",
            color: "#fff",
          }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <button
          className="w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 shadow-xl hover:shadow-xl active:shadow-md transform active:translate-y-1 transition-all duration-150"
          style={{ backgroundColor: "#fff", border: "2px solid #ddd" }}
        >
          <SiGoogle size={20} color="#ff4d2d" />
          Sign Up with Google
        </button>

        {/* Sign In Link */}
        <div className="text-center mt-2">
          <p className="text-gray-600" onClick={() => navigate("/signin")}>
            Already have an account?{" "}
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
        transform: translateY(20px);
      }
    }
    .animate-bounce-slow {
      animation: bounce-slow 8s ease-in-out infinite;
    }
  `}
      </style>
    </div>
  );
}

export default SignUp;
