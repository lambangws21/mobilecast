"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AmountCardProps {
  totalAmount?: number; // ✅ Tambahkan `?` agar tidak error jika `totalAmount` undefined
}

export default function AmountCard({ totalAmount = 0 }: AmountCardProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulasi loading
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center"
    >
      {loading ? (
        <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
      ) : (
        <>
          <p className="text-gray-500 text-sm">Total Amount</p>
          <p className="text-2xl font-bold text-gray-800">
            {(totalAmount ?? 0).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </>
      )}
    </motion.div>
  );
}
