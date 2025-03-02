"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, StretchHorizontal, MessageSquare } from "lucide-react";

const items = [
  { label: "Home", icon: <Home />, path: "/" },
  { label: "Ranking", icon: <Trophy />, path: "/ranking" },
  { label: "Contest", icon: <StretchHorizontal />, path: "/contest" },
  { label: "Messages", icon: <MessageSquare />, path: "/messages" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center py-2 z-50"
    >
      {items.map((item) => (
        <Link href={item.path} key={item.label}>
          <button
            className={`flex flex-col items-center text-xs w-1/4 ${
              pathname === item.path ? "text-blue-500" : "text-slate-800"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="mt-1">{item.label}</span>
          </button>
        </Link>
      ))}
    </motion.div>
  );
}
