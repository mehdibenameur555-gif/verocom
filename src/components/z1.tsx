import React from "react";

type Z1ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "green" | "red" | "blue";
};

export default function Z1Button({ onClick, children, disabled, type = "button", color = "green" }: Z1ButtonProps) {
  let colorClasses = "";
  switch (color) {
    case "red":
      colorClasses = "bg-red-600 hover:bg-red-700 border-red-600";
      break;
    case "blue":
      colorClasses = "bg-blue-600 hover:bg-blue-700 border-blue-600";
      break;
    default:
      colorClasses = "bg-green-600 hover:bg-green-700 border-green-600";
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg text-lg shadow-md transition border-2 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed ${colorClasses}`}
      style={{ minHeight: 32, minWidth: 90 }}
    >
      {children}
    </button>
  );
}
