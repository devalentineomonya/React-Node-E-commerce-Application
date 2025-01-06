"use client";

import { cn } from "@/lib/utils";

interface AuthInputProps {
  type?: string;
  name: string;
  label: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
}

const AuthInput: React.FC<AuthInputProps> = ({
  type = "text",
  name,
  label,
  icon,
  ...props
}) => {
  return (
    <div className="flex flex-col mt-5">
      <div className="relative flex items-center group">
        <input
          className={cn(
            "peer w-full h-12 pl-4 pr-10 text-base text-slate-900 placeholder-transparent bg-[#f7fbff] border border-gray-100 rounded-md outline-none",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          )}
          type={type}
          name={name}
          id={name}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={name}
          className={cn(
            "absolute left-4 top-1/2 text-gray-400 text-lg transition-all duration-200 transform -translate-y-1/2",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg",
            "peer-focus:top-2 peer-focus:text-blue-500 peer-focus:text-sm"
          )}
        >
          {label}
        </label>
        {icon && <span className="absolute right-4 text-gray-400">{icon}</span>}
      </div>
    </div>
  );
};

export default AuthInput;
