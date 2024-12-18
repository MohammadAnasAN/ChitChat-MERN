import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircle, Settings, User } from "lucide-react";

const Navbar = ({ setDiscoEffectOn }) => {
  const { logout, authUser } = useAuthStore();
  const [isDiscoEffectOn, setIsDiscoEffectOn] = useState(false); // State to manage disco effect toggle

  // Function to toggle the disco effect
  const toggleDiscoEffect = () => {
    setIsDiscoEffectOn(!isDiscoEffectOn);
    setDiscoEffectOn(!isDiscoEffectOn); // Pass the state to parent component
  };

  return (
    <header
      className={`bg-base-100 border-2  ${isDiscoEffectOn ? "border-b-primary border-transparent" : "border-transparent"} fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80   shadow-[0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(0,0,0,0.06)] ${isDiscoEffectOn ? "disco-effect" : ""}`}
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-12 rounded-lg  flex items-center justify-center">
              <div
                className={`w-10 h-10 border-2 border-primary rounded-full  flex items-center justify-center group-hover:bg-primary/20 transition-colors ${isDiscoEffectOn ? "disco-effect" : ""}`}
              >
                <img
                  src="/logooo.png"
                  alt="Logo"
                  className="w-8 h-8 "
                />
              </div>
              </div>
              {/* Animated Text */}
              <h1 className={`text-lg font-bold animated-text `} >
                {Array.from("ChiT ChaT").map((letter, index) => (
                  <span
                    key={index}
                    className="letter"
                    style={{
                      animation: `fadeIn 0.2s ease-in-out ${index * 0.2}s forwards, repeatAnimation 10s infinite ${4 + index * 0.10}s`,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="group flex items-center gap-2 rounded-lg px-2 py-1 
              hover:border-2 border-primary hover:text-primary transition-all duration-700 ease-in-out overflow-hidden"
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span
                className="max-w-0 group-hover:max-w-xs transition-all duration-700 ease-in-out overflow-hidden"
              >
                Settings
              </span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="group flex items-center gap-2 rounded-lg px-2 py-1 
                  hover:border-2 border-primary hover:text-primary transition-all duration-700 ease-in-out overflow-hidden"
                >
                  <User className="size-5 shrink-0" />
                  <span
                    className="max-w-0 group-hover:max-w-xs transition-all duration-700 ease-in-out overflow-hidden"
                  >
                    Profile
                  </span>
                </Link>

                <button
                  className="group flex items-center gap-2 rounded-lg px-2 py-1 
                  hover:border-2 border-primary hover:text-primary transition-all duration-700 ease-in-out overflow-hidden"
                  onClick={logout}
                >
                  <LogOut className="size-5 shrink-0" />
                  <span
                    className="max-w-0 group-hover:max-w-xs transition-all duration-700 ease-in-out overflow-hidden"
                  >
                    Logout
                  </span>
                </button>
              </>
            )}

            {/* Button to toggle Disco Light Effect */}
            <div className="flex items-center space-x-4">
      {/* Switch */}
      <label className="switch">
          <input
            type="checkbox"
             checked={isDiscoEffectOn}
              onChange={toggleDiscoEffect}
          />
         <span className={`slider `}></span>
      </label>


      
           </div>
          </div>
        </div>
      </div>

      

      {/* Inline Styles for Disco Effect */}
      <style jsx>{`
        /* Keyframe for Disco Glow Effect */
        @keyframes discoGlow {
          0% {
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.3);
          }
          25% {
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(0, 0, 255, 0.5), 0 0 30px rgba(0, 0, 255, 0.3);
          }
          75% {
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.5), 0 0 30px rgba(255, 255, 0, 0.3);
          }
          100% {
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.3);
          }
        }

        /* Applying Disco Effect with increased length */
        .disco-effect {
          animation: discoGlow 3s ease-in-out infinite; /* Increased duration to 3s */
        }
      `}</style>
    </header>
  );
};

export default Navbar;
