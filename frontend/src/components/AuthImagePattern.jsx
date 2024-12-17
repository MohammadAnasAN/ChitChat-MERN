const AuthImagePattern = ({ title, subtitle }) => {
    // Define an array of colors for the outer circles
    const colors = [
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-teal-400",
      "bg-orange-400",
      "bg-indigo-400",
    ];
  
    return (
      <div className="hidden lg:flex  items-center rounded-xl justify-center bg-base-200 p-12 pt-1 relative">
        {/* Central Circle */}
        <div className="absolute w-10 h-10 bg-slate-600 border-2 border-primary rounded-full animate-spin-slow"></div>
  
        {/* Outer Circles */}
        {colors.map((color, index) => {
          const angle = (index / colors.length) * 360; // Distribute circles evenly
          const x = Math.cos((angle * Math.PI) / 180) * 100; // Calculate x position
          const y = Math.sin((angle * Math.PI) / 180) * 100; // Calculate y position
          return (
            <div
              key={index}
              className={`absolute w-20 h-20 ${color} rounded-full animate-pulse`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                animationDelay: `${index * 0.5}s`, // Stagger animation
              }}
            ></div>
          );
        })}
  
        {/* Text Content */}
        <div className="relative text-center  mt-80 pt-9">
          <h2 className="text-2xl font-bold mb-0">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  