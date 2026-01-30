"use client";

import clsx from "clsx";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  className = "",
  size = "md",
}: ToggleSwitchProps) {
  const sizeClasses = {
    sm: "h-4 w-9",
    md: "h-5 w-12",
    lg: "h-6 w-16",
  };

  const thumbSizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const translateClasses = {
    sm: checked ? "translate-x-5" : "-translate-x-1.5",
    md: checked ? "translate-x-7" : "-translate-x-2",
    lg: checked ? "translate-x-10" : "-translate-x-2.5",
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex ${sizeClasses[size]} items-center rounded-full transition-all duration-200 focus:outline-none border-2 ${
        checked
          ? "bg-green-600 border-green-700"
          : "bg-gray-200 border-gray-300"
      } shadow-[0_2px_8px_0_rgba(60,60,60,0.10)] ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:shadow-lg"} ${className}`}
    >
      {/* ON/OFF text */}
      {/* Removed ON/OFF text for a cleaner toggle */}
      <span
        className={clsx(
          `absolute top-1/2 left-0 transform -translate-y-1/2 shadow-md transition-all duration-300 rounded-full ${checked ? 'bg-[#253056]' : 'bg-gray-400'}`,
          thumbSizeClasses[size],
          translateClasses[size]
        )}
      />
    </button>
  );
}



