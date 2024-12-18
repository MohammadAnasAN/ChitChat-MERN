import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-l from-primary/20 via-primary/40 to-primary/10 relative overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 mt-11 sm:p-12">
        <div
          className="w-full max-w-md space-y-8 p-8 rounded-2xl 
          shadow-[0_4px_15px_rgba(0,0,0,0.25),_0_8px_30px_rgba(0,0,0,0.22)] 
          bg-base-200"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <img
                src="/logooo.png"
                alt="Logo"
                className="w-17 h-12"
              />
              <h1 className="text-2xl font-bold mt-2">Welcome</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-4 left-3 h-5 w-5 text-base-content/40" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-3 left-3 h-5 w-5 text-base-content/40" />
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Title and Bubbles */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 relative">
      <div className="relative text-[90px] sm:text-[120px] font-extrabold leading-tight">
  <div
    className="text-primary relative z-10 animate-zoomInOutChiT"
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
    className="absolute top-10 left-16 text-accent mt-20 animate-zoomInOutChat"
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


         {/* Popping Bubbles */}
        

               {/* Title and Subtitle */}
               <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text">Welcome back!</h2>
          <p className="text-lg text-base-content text-opacity-60 mt-2">
            Sign in to continue your conversations and catch up with your messages.
          </p>
        </div>
      </div>
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
           <div className="absolute bottom-[42%] left-[56%] w-16 h-16 bg-blue-400 rounded-full mix-blend-multiply shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.3)] animate-paintSplashBlue"></div>
            <div className="absolute bottom-20 right-32 w-12 h-12 bg-yellow-300 rounded-full mix-blend-multiply shadow-[0_10px_15px_rgba(0,0,0,0.4),0_4px_4px_rgba(0,0,0,0.3)] animate-paintSplashYellow"></div>
            <div className="absolute top-40 right-16 w-20 h-20 bg-pink-500 rounded-full mix-blend-multiply shadow-[0_12px_18px_rgba(0,0,0,0.6),0_5px_5px_rgba(0,0,0,0.3)] animate-paintSplashPink"></div>
            <div className="absolute bottom-10 right-96 w-24 h-24 bg-red-400 rounded-full mix-blend-multiply shadow-[0_15px_25px_rgba(0,0,0,0.5),0_8px_8px_rgba(0,0,0,0.3)] animate-paintSplashRed"></div>
            <div className="absolute top-32 right-1/3 w-10 h-10 bg-green-400 rounded-full mix-blend-multiply shadow-[0_8px_12px_rgba(0,0,0,0.4),0_3px_3px_rgba(0,0,0,0.3)] animate-paintSplashGreen"></div>
            <div className="absolute top-10 right-1/4 w-14 h-14 bg-orange-400 rounded-full mix-blend-multiply shadow-[0_10px_20px_rgba(0,0,0,0.5),0_4px_4px_rgba(0,0,0,0.3)] animate-paintSplashOrange"></div>
        </div>
    </div>
  );
};

export default LoginPage;
