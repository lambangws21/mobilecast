"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EditForm from "./EditForm";
import { Trash2, Edit2, Eye, ArrowLeft, ArrowRight } from "lucide-react";
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

export default function ListData() {
  const [dataList, setDataList] = useState<DataRow[]>([]);
  const [editData, setEditData] = useState<DataRow | null>(null);
  const [deleteData, setDeleteData] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!deleteData) return;
    try {
      const res = await fetch("/api/delput-pre", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no: deleteData }),
      });
      const result = await res.json();
      if (result.status === "success") {
        toast.success("✅ Data berhasil dihapus!");
        fetchData();
        setDeleteData(null);
      } else {
        toast.error(`❌ Gagal menghapus: ${result.message}`);
      }
    } catch {
      toast.error("⚠️ Terjadi kesalahan saat menghapus data");
    }
  };

  // Total amount tanpa desimal
  const totalAmount = dataList
    .reduce((acc, item) => acc + (item.jumlah || 0), 0)
    .toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const totalPages = Math.ceil(dataList.length / itemsPerPage);
  const paginatedData = dataList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Variants untuk animasi baris tabel
  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {editData && (
        <EditForm
          editData={editData}
          onClose={() => setEditData(null)}
          onUpdate={fetchData}
        />
      )}

      <div className="max-w-[430px] mx-auto">
        <motion.div
          className="mt-8 w-full overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <table className="min-w-full bg-slate-600/50 rounded-lg border-transparent p-2 text-xs">
            <thead>
              <tr className="text-white">
                <th className="p-2 border-b text-[10px]">Date</th>
                <th className="p-2 border-b text-[10px]">Biaya</th>
                <th className="p-2 border-b text-[10px]">Info</th>
                <th className="p-2 border-b text-[10px] text-center sticky right-0 bg-slate-600/50">
                  Rupiah
                </th>
                <th className="p-2 border-b text-[10px]">Klaim</th>
                <th className="p-2 border-b text-[10px] text-center"></th>
                <th className="p-2 border-b text-[10px]">Aksi</th>
              </tr>
            </thead>
            <motion.tbody
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {paginatedData.map((item) => (
                <motion.tr
                  key={item.no}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white hover:bg-slate-50 transition"
                >
                  <td className="p-2 border-b text-[10px] text-center">{formatDate(item.date)}</td>
                  <td className="p-2 border-b text-[10px]">{item.jenisBiaya}</td>
                  <td className="p-2 border-b text-[10px]">{item.keterangan}</td>
                  <td className="p-2 border-b text-[10px] text-right sticky right-0 bg-white z-10">
                    {item.jumlah.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="p-2 border-b text-[10px]">{item.klaimOleh}</td>
                  <td className="p-2 border-b text-[10px]">
                    <a
                      href={item.status}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center text-blue-500 underline"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  </td>
                  <td className="p-2 border-b text-[10px]">
                    <div className="flex justify-center gap-1">
                      <button onClick={() => setEditData(item)} className="text-green-500">
                        <Edit2 className="w-3 h-3 hover:scale-110 transition" />
                      </button>
                      <button onClick={() => setDeleteData(item.no)} className="text-red-500">
                        <Trash2 className="w-3 h-3 hover:scale-110 transition" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
            <tfoot className="rounded-lg">
              <tr className="font-bold bg-gray-200/0 text-slate-600 ">
                <td colSpan={6} className="p-2 text-right">
                  TOTAL: {totalAmount}
                </td>
              </tr>
            </tfoot>
          </table>
        </motion.div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="p-2 bg-gray-300 rounded-full text-[10px] disabled:opacity-50"
          >
            <ArrowLeft className="h-3 w-3 hover:scale-110 transition" />
          </button>
          <span className="text-[10px]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-300 rounded-full text-[10px] disabled:opacity-50"
          >
            <ArrowRight className="h-3 w-3 hover:scale-110 transition" />
          </button>
        </div>
      </div>

      {deleteData !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold">Konfirmasi Hapus</h2>
            <p>Yakin ingin menghapus data ini?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Hapus
              </button>
              <button onClick={() => setDeleteData(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
