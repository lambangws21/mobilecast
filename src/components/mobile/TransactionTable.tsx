"use client";

import React from "react";
import { motion } from "framer-motion";
import { Transaction } from "@/types/mobile";
import { Eye } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
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
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {transactions.map((item, idx) => (
            <motion.tr
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="border-b"
            >
              <td className="p-2 text-slate-600">{item.date}</td>
              <td className="p-2 text-slate-600">{item.amount}</td>
              <td className="p-2 text-center">
                <button className="text-blue-500 hover:text-blue-700">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 inline-block" />
                </button>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </motion.div>
  );
}
