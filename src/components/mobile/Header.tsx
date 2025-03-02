"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full bg-white text-slate-900 p-3 text-center font-bold shadow-sm rounded-b-3xl"
    >
      My Dashboard 
    </motion.header>
  );
}
