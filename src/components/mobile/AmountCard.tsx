"use client";

import React from "react";
import { motion } from "framer-motion";

interface AmountCardProps {
  totalAmount: number;
}

const AmountCard: React.FC<AmountCardProps> = ({ totalAmount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center"
    >
      <p className="text-gray-500 text-sm">Total Amount</p>
      <p className="text-2xl font-bold text-gray-800">
        {(totalAmount ?? 0).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </p>
    </motion.div>
  );
};

export default AmountCard;
