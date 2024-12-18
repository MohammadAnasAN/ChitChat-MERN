import { useState } from "react";

const NoChatSelected = ({ isDiscoEffectOn }) => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16">
      <div className="max-w-4xl text-center space-y-8 p-12 rounded-3xl shadow-[0_4px_10px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.3)] transform transition-all hover:scale-105 relative overflow-hidden">
        {/* Floating Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/5 "></div>

        {/* Logo Display */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
            <img src="/logooo.png" alt="ChiT ChaT Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        

        {/* Animated Welcome Text with Shadow */}
        <h1 className="text-4xl font-bold text-primary z-10 relative">
          {Array.from("ChiT ChaT").map((letter, index) => (
            <span
              key={index}
              className="letter inline-block"
              style={{
                animation: `fadeIn 0.2s ease-in-out ${index * 0.2}s forwards, repeatAnimation 10s infinite ${6 + index * 0.10}s`,
                textShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Adding shadow to text
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        {/* Subtitle - Make it Visible */}
        <h6 className="text-lg text-opacity-40 text-base-content font-semibold mt-4 relative z-10">
          Select a conversation from the sidebar to start chatting
        </h6>
      </div>
    </div>
  );
};

export default NoChatSelected;
