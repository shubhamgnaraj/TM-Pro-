import React from "react";

function ButtonField(innerText) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-md hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
    >
      {innerText}
    </button>
  );
}

export default ButtonField;
