"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Plus } from "lucide-react";
import { DataRow } from "@/types/dataoperasi";
import FormModal from "./form-modal";
import ActionButton from "@/components/ui/ActionButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Format tanggal ke `dd/mm/yy`
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? dateString
    : `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${String(date.getFullYear()).slice(-2)}`;
};

// ✅ Komponen utama DataTable
export default function DataTable() {
  const [dataList, setDataList] = useState<DataRow[]>([]);
  const [editData, setEditData] = useState<DataRow | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 3;

  // ✅ Hitung Total Amount dari semua data
  const totalAmount = dataList.reduce(
    (acc, item) => acc + Number(item.jumlah),
    0
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-operasi");
      const result = await res.json();
      if (result.status === "success") {
        setDataList(result.data || []);
      } else {
        toast.error("❌ Gagal mengambil data!");
      }
    } catch {
      toast.error("⚠️ Terjadi kesalahan jaringan!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (no: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      const res = await fetch("/api/post-operasi", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no }),
      });

      const result = await res.json();
      if (result.status === "success") {
        toast.success("✅ Data berhasil dihapus!");
        fetchData();
      } else {
        toast.error("❌ Gagal menghapus data!");
      }
    } catch {
      toast.error("⚠️ Terjadi kesalahan saat menghapus!");
    }
  };

  // ✅ Hitung index data yang akan ditampilkan berdasarkan pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  return (
    <div className="max-w-[430px] mx-auto p-1 rounded-lg">
      <ToastContainer position="top-left" autoClose={3000} />

      {/* ✅ Tombol Tambah Data */}
      <motion.button
        onClick={() => setModalOpen(true)}
        className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition mb-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
       <Plus size={18}/> Tambah Data
      </motion.button>

      {/* ✅ Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onUpload={fetchData}
        editData={editData}
      />

      {/* ✅ Total Amount */}
      <div className="text-lg font-bold text-center text-gray-700 bg-gray-200 py-2 rounded-md mb-3">
        Total Amount:
        <span className="text-blue-600">Rp {totalAmount.toLocaleString()}</span>
      </div>

      {/* ✅ Loading Animation */}
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
          <table className="min-w-full bg-slate-100/50 rounded-lg border-transparent p-2 text-xs">
            <thead className="bg-slate-600 text-white text-xs">
              <tr>
                {[
                  "Date",
                  "Hospital",
                  "Operation",
                  "Doctor",
                  "Get",
                  "Status",
                  "",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b text-[10px] p-2 text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody>
              {currentData.map((row, index) => (
                <motion.tr
                  key={`${row.no}-${index}`} // ✅ Tambahkan index agar selalu unik
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-200 transition text-[10px]"
                >
                  <td className="p-2 border-b text-center">
                    {formatDate(row.date)}
                  </td>
                  <td className="p-2 border-b">{row.rumahSakit}</td>
                  <td className="p-2 border-b">{row.tindakanOperasi}</td>
                  <td className="p-2 border-b">{row.operator}</td>
                  <td className="p-2 border-b text-right">
                    {Number(row.jumlah).toLocaleString()}
                  </td>
                  <td className="p-2 border-b text-center">
                    <a
                      href={row.status}
                      target="_blank"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </a>
                  </td>

                  {/* ✅ Gunakan ActionButton */}
                  <td className="border-b p-2 text-center">
                    <ActionButton
                      onEdit={() => {
                        setEditData(row);
                        setModalOpen(true);
                      }}
                      onDelete={() => handleDelete(row.no)}
                    />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </motion.div>
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          className="p-2 bg-gray-300 rounded-full text-[10px] disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
            <ChevronLeft/>
        </button>
        <span className="text-gray-700 font-[8px]">
          Page {currentPage} of {Math.ceil(dataList.length / dataPerPage)}
        </span>
        <button
          className="p-2 bg-gray-300 rounded-full text-[10px] disabled:opacity-50"
          disabled={indexOfLastData >= dataList.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <ChevronRight/>
        </button>
      </div>
    </div>
  );
}
