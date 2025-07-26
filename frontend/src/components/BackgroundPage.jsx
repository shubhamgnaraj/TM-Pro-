import React from "react";

function BackgroundPage({children}) {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-700 via-teal-500 to-green-400 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-green-300 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-300 opacity-20 rounded-full blur-2xl z-0 transform -translate-x-1/2 -translate-y-1/2"></div>

      {children}
    </div>
  );
}

export default BackgroundPage;
