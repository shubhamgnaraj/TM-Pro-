import React from "react";

function ButtonField({insideText}) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-br from-[#c6ffe0] via-[#f6e6ff] to-[#d1e3ff] text-slate-500 py-1 px-2 rounded-lg font-bold text-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
    >
      {insideText}
    </button>
  );
}

export default ButtonField;
