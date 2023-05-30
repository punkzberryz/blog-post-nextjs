import React from "react";

export default function Button({
  onClick,
  children,
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      className="m-2 p-2 border rounded bg-purple-600 text-center text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
