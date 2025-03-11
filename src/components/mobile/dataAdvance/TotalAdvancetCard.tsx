"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LandPlot, Loader2 } from "lucide-react";
import { DataRow } from "@/types/dataoperasi";

interface TotalAmountResponse {
  status: string;
  data: DataRow[];
}

const TotalAmountCard: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [dataCount, setDataCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data, menghitung total amount, dan menghitung jumlah data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/get-data-pre");
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const result: TotalAmountResponse = await res.json();
      
      console.log("Fetched data:", result.data);
      
      if (result.status === "success" && Array.isArray(result.data)) {
        // Hitung total amount
        const total = result.data.reduce(
          (acc, row) => acc + (Number(row.jumlah) || 0),
          0
        );
        // Hitung jumlah data (baris)
        const count = result.data.length;
        setTotalAmount(total);
        setDataCount(count);
      } else {
        throw new Error("Gagal memuat data.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setTotalAmount(0);
      setDataCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white/15 rounded-xl shadow-md flex flex-col items-center justify-center"
    >
      <div className="text-gray-500 text-[11px] flex items-center gap-2 font-bold">
        <LandPlot className="w-6 h-6 text-amber-900  "/>
        Total Advance</div>
      {loading ? (
        <Loader2 className="animate-spin w-10 h-10 text-gray-500 mt-2" />
      ) : error ? (
        <p className="text-red-500 text-xs">{error}</p>
      ) : (
        <>
          <p className="text-[15px] ml-6 font-bold text-green-800">
            {totalAmount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-[8px] text-white mt-2 font-bold py-[5px] p-4 bg-green-600 rounded-full">
            Operasi: {dataCount}
          </p>
        </>
      )}
    </motion.div>
  );
};

export default TotalAmountCard;
