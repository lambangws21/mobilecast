"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Edit2, Trash2, Eye, File } from "lucide-react";
import { exportToExcel } from "@/lib/exportToExcel";
import { DataRow } from "@/types/transaction";
import EditForm from "./EditForm";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("id-ID");
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
      const result = await res.json();
      if (result.status === "success") {
        const parsedData = result.data.map((row: DataRow) => ({
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
        toast.error("Gagal memuat data");
      }
    } catch {
      toast.error("Terjadi kesalahan saat memuat data");
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
        toast.success("Data berhasil dihapus!");
        fetchData();
        setDeleteData(null);
      } else {
        toast.error("Gagal menghapus data");
      }
    } catch {
      toast.error("Terjadi kesalahan saat menghapus data");
    }
  };

  const totalAmount = dataList.reduce((acc, item) => acc + item.jumlah, 0).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const totalPages = Math.ceil(dataList.length / itemsPerPage);
  const paginatedData = dataList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => exportToExcel(dataList)}
          className="mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          <File className="w-5 h-5" />
          Export ke Excel
        </motion.button>

        <table className="min-w-full text-sm bg-white shadow rounded-xl overflow-hidden border border-gray-200">
          <thead className="bg-slate-800 text-white text-xs">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Jenis Biaya</th>
              <th className="p-2">Keterangan</th>
              <th className="p-2 text-right">Jumlah (Rp)</th>
              <th className="p-2">Klaim Oleh</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <motion.tbody>
            {paginatedData.map((item) => (
              <tr key={item.no} className="hover:bg-slate-100 transition">
                <td className="p-2 text-center">{formatDate(item.date)}</td>
                <td className="p-2">{item.jenisBiaya}</td>
                <td className="p-2">{item.keterangan}</td>
                <td className="p-2 text-right">
                  {item.jumlah.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="p-2">{item.klaimOleh}</td>
                <td className="p-2 text-center">
                  <a
                    href={item.status}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                    title="Lihat status"
                  >
                    <Eye className="w-5 h-5 mx-auto" />
                  </a>
                </td>
                <td className="p-2 flex gap-2 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setEditData(item)}
                    className="text-green-600 hover:text-green-800"
                    title="Edit data"
                  >
                    <Edit2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setDeleteData(item.no)}
                    className="text-red-600 hover:text-red-800"
                    title="Hapus data"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </td>
              </tr>
            ))}
          </motion.tbody>
          <tfoot>
            <tr className="bg-slate-700 text-white font-semibold">
              <td colSpan={7} className="p-2 text-right">
                TOTAL: {totalAmount}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="flex justify-center items-center mt-6 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-slate-200 text-sm rounded-full disabled:opacity-50"
          >
            Previous
          </motion.button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-slate-200 text-sm rounded-full disabled:opacity-50"
          >
            Next
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {deleteData !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center w-72"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-lg font-semibold text-red-600">
                Konfirmasi Hapus
              </h2>
              <p className="text-sm text-gray-700 mt-2">
                Yakin ingin menghapus data ini?
              </p>
              <div className="flex justify-center gap-4 mt-5">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Hapus
                </button>
                <button
                  onClick={() => setDeleteData(null)}
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
