import React from "react";

const InputBox = ({ label, placeholder, onChange, value }) => {
  return (
    <div className="my-1">
      <div className="font-medium text-sm text-left py-2">{label}</div>
      <div>
        <input
          value={value}
          className="w-full border border-slate-200 rounded px-2 py-1"
          type="text"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputBox;
