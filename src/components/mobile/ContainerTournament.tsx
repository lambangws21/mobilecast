"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface TotalAmountResponse {
  status: string;
  totalAmount: number;
}

const TotalAmountCard: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk fetch total amount dari endpoint API
  const fetchTotalAmount = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/get-data-pre");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data: TotalAmountResponse = await res.json();
      if (data.status === "success") {
        setTotalAmount(data.totalAmount);
      } else {
        throw new Error("Gagal memuat total amount.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      setTotalAmount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data saat komponen dimuat dan auto-refresh setiap 10 menit
  useEffect(() => {
    fetchTotalAmount();
    const refreshInterval = setInterval(fetchTotalAmount, 600000); // 600000 ms = 10 menit
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center"
    >
      <p className="text-gray-500 text-sm">Total Amount</p>
      {isLoading ? (
        <Loader2 className="animate-spin w-10 h-10 text-gray-500 mt-2" />
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <p className="text-2xl font-bold text-gray-800">
          {(totalAmount ?? 0).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
      )}
    </motion.div>
  );
};

export default TotalAmountCard;
