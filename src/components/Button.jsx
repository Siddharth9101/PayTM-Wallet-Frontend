import React from "react";

const Button = ({ label, color, hover, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full font-medium text-white text-sm ${color} hover:${hover} focus:outline-none rounded-lg px-5 py-2.5 me-2 mb-2 cursor-pointer`}
    >
      {label}
    </button>
  );
};

export default Button;
