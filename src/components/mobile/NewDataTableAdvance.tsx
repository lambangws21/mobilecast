"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditForm from "@/components/sheets-pre/EditForm";
import FormModal from "@/components/sheets-pre/NewUploadForm";
import { Eye, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import ActionButton from "@/components/ui/ActionButton";
import { ToastContainer, toast } from "react-toastify";
import { DataRow } from "@/types/transaction";
import "react-toastify/dist/ReactToastify.css";

// ✅ Format tanggal ke `dd/mm`
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? dateString
    : `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
};

export default function NewDataTableAdvance() {
  const [dataList, setDataList] = useState<DataRow[]>([]);
  const [editData, setEditData] = useState<DataRow | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // ✅ Digunakan dalam pagination
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 4;

  // ✅ Fetch Data dari API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/get-data-pre");
      const result = await res.json();
      if (result.status === "success") {
        setDataList(
          result.data.map((row: DataRow) => ({
            no: Number(row.no),
            date: row.date,
            jenisBiaya: row.jenisBiaya,
            keterangan: row.keterangan,
            jumlah: Number(row.jumlah),
            klaimOleh: row.klaimOleh,
            status: row.status,
          }))
        );
      } else {
        toast.error("❌ Gagal memuat data");
      }
    } catch {
      toast.error("⚠️ Terjadi kesalahan saat memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Menghapus data dengan konfirmasi
  const handleDelete = async (no: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch("/api/delput-pre", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no }),
      });

      const result = await res.json();
      if (result.status === "success") {
        toast.success("✅ Data berhasil dihapus!");
        fetchData(); // 🔹 Refresh data setelah delete
      } else {
        toast.error("❌ Gagal menghapus data!");
      }
    } catch {
      toast.error("⚠️ Terjadi kesalahan saat menghapus!");
    }
  };

  // ✅ Menghitung total amount menggunakan `useMemo`
  const totalAmount = useMemo(() => {
    return dataList
      .reduce((acc, item) => acc + (item.jumlah || 0), 0)
      .toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
  }, [dataList]);

  // ✅ Pagination
  const totalPages = Math.max(1, Math.ceil(dataList.length / itemsPerPage));
  const paginatedData = dataList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} />

      {editData && (
        <EditForm
          editData={editData}
          onClose={() => setEditData(null)}
          onUpdate={fetchData}
        />
      )}

      {/* ✅ Tombol Tambah Data */}
      <motion.button
        onClick={() => setModalOpen(true)}
        className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition mb-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={18} /> Tambah Data
      </motion.button>

      {/* ✅ Total Amount */}
      <div className="text-lg font-bold text-center text-gray-700 bg-gray-200 py-2 rounded-md mb-2">
        Total Amount:
        <span className="text-blue-600">Rp {totalAmount.toLocaleString()}</span>
      </div>

      {/* ✅ Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Tombol Tutup */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <X size={24} />
              </button>

              {/* Form */}
              <FormModal
                onUpload={() => {
                  fetchData();
                  setModalOpen(false); // ✅ Tutup modal setelah upload berhasil
                }}
                onclose={() => setModalOpen(false)} // ✅ Tambahkan onClose agar tidak error
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Tabel Data */}
      <div className="max-w-[430px] mx-auto">
        <motion.div
          className="mt-6 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-4 text-gray-500"
            >
              <div className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-12 h-12 mx-auto mb-2"></div>
              <p>Memuat data...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overflow-x-auto"
            >
              <table className="min-w-full bg-white rounded-lg shadow-md border">
                <thead className="bg-slate-700 text-white text-xs">
                  <tr>
                    {[
                      "Date",
                      "Biaya",
                      "Info",
                      "Jumlah",
                      "Klaim",
                      "Status",
                      "",
                    ].map((header) => (
                      <th
                        key={header}
                        className="p-2 border-b text-[10px] text-center"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <motion.tbody>
                  {paginatedData.map((item, index) => (
                    <motion.tr
                      key={`${item.no}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-200 transition text-[10px]"
                    >
                      <td className="p-2 border-b text-[10px] text-center">
                        {formatDate(item.date)}
                      </td>
                      <td className="p-2 border-b text-[10px]">
                        {item.jenisBiaya}
                      </td>
                      <td className="p-2 border-b text-[10px]">
                        {item.keterangan}
                      </td>
                      <td className="p-2 border-b text-[10px] text-right">
                        {item.jumlah.toLocaleString("id-ID")}
                      </td>
                      <td className="p-2 border-b text-[10px]">
                        {item.klaimOleh}
                      </td>
                      <td className="p-2 border-b text-center">
                        <a
                          href={item.status}
                          target="_blank"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          <Eye size={18} />
                        </a>
                      </td>
                      <td className="border-b p-2 text-center">
                        <ActionButton
                          onEdit={() => {
                            setEditData(item);
                          }}
                          onDelete={() => handleDelete(item.no)}
                        />
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </motion.div>
          )}
        </motion.div>
        {/* ✅ Pagination Controls */}
        <div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-gray-300 rounded-full text-[10px] disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="text-[10px]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-300 rounded-full text-[10px] disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}
