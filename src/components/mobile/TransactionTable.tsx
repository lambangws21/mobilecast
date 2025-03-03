"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { Transaction } from "@/types/mobile";


interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const itemsPerPage = 4;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Auto carousel: berpindah halaman setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const displayedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Variants untuk transisi container
  const containerVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="overflow-x-auto w-full text-xs bg-white border border-slate-200"
    >
      <table className="w-full table-auto text-xs md:text-sm bg-white border border-slate-300 rounded-lg">
        <thead className="bg-slate-100 text-slate-800">
          <tr className="whitespace-nowrap">
            <th className="p-2 text-left">Tanggal</th>
            <th className="p-2 text-left">Jumlah</th>
            <th className="p-2 text-center">Aksi</th>
          </tr>
        </thead>
        <AnimatePresence mode="wait">
          <motion.tbody
            key={currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {displayedTransactions.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2 text-slate-600">{item.date}</td>
                <td className="p-2 text-slate-600">{item.amount}</td>
                <td className="p-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Eye className="w-4 h-4 md:w-5 md:h-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </motion.tbody>
        </AnimatePresence>
      </table>
    </motion.div>
  );
}
