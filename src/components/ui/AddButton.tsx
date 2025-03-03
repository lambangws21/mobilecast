"use client";
import React from "react";


interface AddDataButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function AddDataButton({ label = "Tambah Data", className, ...props }: AddDataButtonProps) {
  return (
    <button
      {...props}
      className={`flex items-center gap-2 text-white py-2 px-4 rounded-lg hover:bg-blue-600/20 transition ${className || ""}`}
    >
      <span>{label}</span>
    </button>
  );
}
