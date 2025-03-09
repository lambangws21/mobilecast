import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-slate-200/30 -mt-10 flex justify-center">
      <div className="w-[430px] min-h-screen p-[1px] bg-slate-300 mt-10 rounded-2xl text-slate-700 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
