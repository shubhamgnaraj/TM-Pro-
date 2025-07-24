import React from "react";

function HeadingComp({headingName}) {
  return (
    <h2 className="text-3xl font-extrabold text-white mt-2 text-center drop-shadow-lg tracking-wide ">
      <span className="bg-gradient-to-r from-[#839e9e] via-[#94839e] to-[#ac879a] bg-clip-text text-transparent">
       {headingName}
      </span>
    </h2>
  );
}

export default HeadingComp;
