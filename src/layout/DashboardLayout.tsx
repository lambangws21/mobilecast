import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-black flex justify-center">
      <div className="w-[412px] min-h-screen bg-black text-white overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
