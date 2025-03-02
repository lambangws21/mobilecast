"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full bg-white text-slate-900 text-center font-bold rounded-b-xl fixed top-0 left-0 right-0  shadow-lg flex justify-around items-center py-2 z-50"
    >
      My Dashboard 
    </motion.header>
  );
}


