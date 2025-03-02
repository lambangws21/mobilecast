"use client";

import { motion } from "framer-motion";
import { Home, Trophy, StretchHorizontal, MessageSquare   } from "lucide-react";

const items = [
  { label: "Home", icon: <Home /> },
  { label: "Ranking", icon: <Trophy /> },
  { label: "Contest", icon: <StretchHorizontal /> },
  { label: "Messages", icon: <MessageSquare/> },
];

export function Sidebar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center py-2 z-50"
    >
      {items.map((item) => (
        <button
          key={item.label}
          className="flex flex-col items-center text-xs text-slate-800 w-1/4"
        >
          <span className="text-xl">{item.icon}</span>
          <span className="mt-1">{item.label}</span>
        </button>
      ))}
    </motion.div>
  );
}
