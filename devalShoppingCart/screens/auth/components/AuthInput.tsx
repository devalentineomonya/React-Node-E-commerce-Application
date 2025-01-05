"use client"
import React, { useState } from "react";
import {cn} from "@/lib/utils"
interface AuthInputProps {
  type?: string;
  name: string;
  label: string;
  index: number;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const AuthInput: React.FC<AuthInputProps> = ({
  type = "text",
  name,
  label,
  index,
  value,
  onInputChange,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e);
    setIsFocused(!!e.target.value);
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="flex justify-between items-center h-12 w-full pl-4 border border-gray-100 rounded-md mt-2 px-4 text-gray-500 relative bg-[#f7fbff]">
        <label
          htmlFor={`${name}-${index}`}
          className={cn(
            "text-lg font-normal text-gray-400 absolute top-2 transition-all duration-200",
            (isFocused || value) && "-top-3 text-blue-500"
          )}
        >
          {label}
        </label>
        <input
        className="w-full outline-none placeholder:text-gray-500 text-slate-900 text-base bg-transparent select-none"
          type={type}
          name={name}
          id={`${name}-${index}`}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {icon && <span className="input-icon">{icon}</span>}
      </div>
    </div>
  );
};

export default AuthInput;
