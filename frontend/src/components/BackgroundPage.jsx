import React from "react";

function BackgroundPage({children, className}) {
  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-[#c6ffe0] via-[#f6e6ff] to-[#d1e3ff] p-8 ${className}`}>
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-green-300 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-300 opacity-20 rounded-full blur-2xl z-0 transform -translate-x-1/2 -translate-y-1/2"></div>

      {children}
    </div>
  );
}

export default BackgroundPage;
