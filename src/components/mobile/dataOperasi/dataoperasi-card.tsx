"use client";

import React from "react";
import { motion } from "framer-motion";

interface SummaryCardProps {
  totalOperasi: number;
}

export default function SummaryCard({ totalOperasi }: SummaryCardProps) {
  return (
    <motion.div
      className="p-4 bg-blue-500 text-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold">Total Operasi</h3>
      <p className="text-3xl font-bold">{totalOperasi}</p>
    </motion.div>
  );
}
