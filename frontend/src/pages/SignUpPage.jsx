import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-l from-primary/20 via-primary/40 to-primary/10 relative overflow-hidden">
      {/* Left Side - Sign Up Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 mt-14 sm:p-12">
        <div
          className="w-full max-w-md space-y-8 p-8 rounded-2xl 
          shadow-[0_4px_15px_rgba(0,0,0,0.25),_0_8px_30px_rgba(0,0,0,0.22)] 
          bg-base-200"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              {/* <img src="/logooo.png" alt="Logo" className="w-17 h-12" /> */}
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute inset-y-0 left-3 h-5 w-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-3 h-5 w-5 text-base-content/40" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-3 h-5 w-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Already have an account? */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Bubbles and Welcome */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 relative">
        <div className="relative text-[90px] sm:text-[120px] font-extrabold leading-tight">
          <div
            className="text-primary relative z-10"
            style={{
              textShadow: `
                4px 4px 10px rgba(0, 0, 0, 0.6),
                -4px -4px 10px rgba(255, 255, 255, 0.4),
                2px 2px 20px rgba(0, 0, 255, 0.3)
              `,
            }}
          >
            ChiT
          </div>
          <div
            className="absolute top-10 left-16 text-accent "
            style={{
              textShadow: `
                4px 4px 10px rgba(0, 0, 0, 0.6),
                -4px -4px 10px rgba(255, 255, 255, 0.4),
                2px 2px 20px rgba(0, 0, 255, 0.3)
              `,
              transform: "translateY(0.8em)",
              fontSize: "0.8em",
            }}
          >
            Chat
          </div>
        </div>
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold">Join Us!</h2>
          <p className="text-lg text-gray-500 mt-2">
            Start your journey and connect with the community.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
          <div className="absolute bottom-[42%] left-[56%] w-16 h-16 bg-blue-400 rounded-full mix-blend-multiply shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.3)] animate-pulse"></div>
          <div className="absolute bottom-20 right-32 w-12 h-12 bg-yellow-300 rounded-full mix-blend-multiply shadow-[0_10px_15px_rgba(0,0,0,0.4),0_4px_4px_rgba(0,0,0,0.3)] animate-pulse"></div>
          <div className="absolute top-40 right-16 w-20 h-20 bg-pink-500 rounded-full mix-blend-multiply shadow-[0_12px_18px_rgba(0,0,0,0.6),0_5px_5px_rgba(0,0,0,0.3)] animate-pulse"></div>
          <div className="absolute bottom-10 right-96 w-24 h-24 bg-red-400 rounded-full mix-blend-multiply shadow-[0_15px_25px_rgba(0,0,0,0.5),0_8px_8px_rgba(0,0,0,0.3)] animate-pulse"></div>
          <div className="absolute top-32 right-1/3 w-10 h-10 bg-green-400 rounded-full mix-blend-multiply shadow-[0_8px_12px_rgba(0,0,0,0.4),0_3px_3px_rgba(0,0,0,0.3)] animate-pulse"></div>
          {/* <div className="absolute bottom-[12%] left-[60%] w-8 h-8 bg-purple-400 rounded-full mix-blend-multiply shadow-[0_6px_10px_rgba(0,0,0,0.5),0_2px_2px_rgba(0,0,0,0.3)] animate-pulse"></div> */}
          <div className="absolute top-10 right-1/4 w-14 h-14 bg-orange-400 rounded-full mix-blend-multiply shadow-[0_10px_20px_rgba(0,0,0,0.5),0_4px_4px_rgba(0,0,0,0.3)] animate-pulse"></div>
        </div>
    </div>
  );
};

export default SignUpPage;
