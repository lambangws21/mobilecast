"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Pizza, Car, Ticket, ArrowLeft, ArrowRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { DataRow } from "@/types/transaction";
import "react-toastify/dist/ReactToastify.css";

// Format tanggal: hanya DD/MM
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
};

// Fungsi untuk menentukan icon berdasarkan jenisBiaya
const getIcon = (jenisBiaya?: string) => {
  const lower = (jenisBiaya || "").toLowerCase();
  if (lower.includes("meals") || lower.includes("makan")) {
    return (
      <Pizza className="w-20 h-20 text-yellow-500 bg-yellow-100/50 shadow-xl p-2 rounded-full inline-block" />
    );
  } else if (
    lower.includes("transport") ||
    lower.includes("transportasi online") ||
    lower.includes("transportasi") ||
    lower.includes("gojek") ||
    lower.includes("jek") ||
    lower.includes("grab") ||
    lower.includes("gocar") ||
    lower.includes("gcar") ||
    lower.includes("goride") ||
    lower.includes("gride")
  ) {
    return (
      <Car className="w-20 h-20 text-green-500 bg-green-100/50 shadow-xl p-2 rounded-full inline-block" />
    );
  } else if (lower.includes("ticket") || lower.includes("tiket")) {
    return (
      <Ticket className="w-20 h-20 text-red-500 bg-red-100/50 shadow-xl p-2 rounded-full inline-block" />
    );
  } else {
    return null;
  }
};

export default function NewTransactionInfo() {
  const [dataList, setDataList] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/get-data-pre");
      const result: { status: string; data: DataRow[] } = await res.json();
      if (result.status === "success") {
        const parsedData: DataRow[] = result.data.map((row) => ({
          no: Number(row.no),
          date: row.date,
          jenisBiaya: row.jenisBiaya,
          keterangan: row.keterangan,
          jumlah: Number(row.jumlah),
          klaimOleh: row.klaimOleh,
          status: row.status,
        }));
        setDataList(parsedData);
      } else {
        toast.error("❌ Gagal memuat data");
      }
    } catch {
      toast.error("⚠️ Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto carousel: ganti item setiap 9 detik
  useEffect(() => {
    if (!loading && dataList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === dataList.length - 1 ? 0 : prev + 1));
      }, 9000);
      return () => clearInterval(interval);
    }
  }, [loading, dataList]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? dataList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === dataList.length - 1 ? 0 : prev + 1));
  };

  // Variants untuk transisi carousel tanpa scaling (hanya geser horizontal)
  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {loading ? (
        <div className="h-screen flex items-center justify-center">Loading...</div>
      ) : (
        <div className="max-w-md mx-auto p-4">
          {/* Container dengan ukuran tetap dan overflow-hidden */}
          <div className="relative h-64 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={dataList[currentIndex].no}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 60, damping: 25 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg p-4"
              >
                <div className="text-gray-500 text-sm font-semibold border-2 border-gray-300 rounded-full px-4 py-1 mb-2 shadow-2xl">
                  {formatDate(dataList[currentIndex].date)}
                </div>
                <div className="flex flex-col items-center gap-2 my-2">
                  {getIcon(dataList[currentIndex].jenisBiaya)}
                  <span className="text-2xl font-extrabold">
                    {dataList[currentIndex].jenisBiaya}
                  </span>
                </div>
                <div className="text-green-600 font-bold text-xl">
                  {dataList[currentIndex].jumlah.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
                <div className="mt-2">
                  {dataList[currentIndex].status ? (
                    <a
                      href={dataList[currentIndex].status}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      <Eye className="w-5 h-5 inline-block" />
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Kontrol Navigasi */}
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              onClick={handlePrevious}
              className="p-2 bg-gray-300 rounded-full text-xs shadow-2xl"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs">
              {currentIndex + 1} / {dataList.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2 bg-gray-300 rounded-full text-xs shadow-2xl"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
