"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EditForm from "./EditForm";
import { Trash2, Edit2, Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { DataRow } from "@/types/transaction";
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

  const totalAmount = dataList
    .reduce((acc, item) => acc + (item.jumlah || 0), 0)
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const totalPages = Math.ceil(dataList.length / itemsPerPage);
  const paginatedData = dataList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {editData && (
        <EditForm editData={editData} onClose={() => setEditData(null)} onUpdate={fetchData} />
      )}

      <div className="max-w-[430px] mx-auto">
        <motion.div
          className="mt-8 w-full overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-center mb-4">📋 Daftar Data (Sheet1)</h2>
          <table className="min-w-full bg-slate-600 rounded-lg border p-2 text-sm">
            <thead>
              <tr className="text-white">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Jenis Biaya</th>
                <th className="p-2 border">Keterangan</th>
                {/* Kolom Jumlah dibuat sticky di sisi kanan */}
                <th className="p-2 border text-right sticky right-0 bg-slate-600">
                  Jumlah (Rp)
                </th>
                <th className="p-2 border">Klaim Oleh</th>
                <th className="p-2 border text-center">Status</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
              {paginatedData.map((item) => (
                <tr key={item.no} className="bg-white hover:bg-slate-50 transition">
                  <td className="p-2 border text-center">{formatDate(item.date)}</td>
                  <td className="p-2 border">{item.jenisBiaya}</td>
                  <td className="p-2 border">{item.keterangan}</td>
                  <td className="p-2 border text-right sticky right-0 bg-white z-10">
                    {item.jumlah.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                  </td>
                  <td className="p-2 border">{item.klaimOleh}</td>
                  <td className="p-2 border text-center">
                    <a href={item.status} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      <Eye className="w-5 h-5 mx-auto" />
                    </a>
                  </td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button onClick={() => setEditData(item)} className="text-green-500">
                      <Edit2 className="w-5 h-5 hover:scale-110 transition" />
                    </button>
                    <button onClick={() => setDeleteData(item.no)} className="text-red-500">
                      <Trash2 className="w-5 h-5 hover:scale-110 transition" />
                    </button>
                  </td>
                </tr>
              ))}
            </motion.tbody>
            <tfoot>
              <tr className="font-bold bg-gray-700 text-white">
                <td colSpan={7} className="p-2 text-right">
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
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
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
