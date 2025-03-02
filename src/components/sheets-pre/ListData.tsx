"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EditForm from "./EditForm";
import { Trash2, Edit2, Eye } from "lucide-react"; // ❌ Hapus XCircle yang tidak digunakan
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataRow {
  no: number;
  date: string;
  jenisBiaya: string;
  keterangan: string;
  jumlah: string;
  klaimOleh: string;
  status: string;
}

// 🔹 Fungsi untuk format tanggal DD-MM-YYYY
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function ListData() {
  const [dataList, setDataList] = useState<DataRow[]>([]);
  const [editData, setEditData] = useState<DataRow | null>(null);
  const [deleteData, setDeleteData] = useState<number | null>(null);

  // 🔹 Fungsi untuk menghitung total jumlah
  const calculateTotal = (data: DataRow[]) => {
    return data.reduce((acc, item) => acc + (parseFloat(item.jumlah) || 0), 0);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/get-data-pre");
      const data = await res.json();
      if (data.status === "success") {
        setDataList(data.data || []);
      } else {
        toast.error("❌ Gagal memuat data");
      }
    } catch (err) {
      console.error("⚠️ Error saat fetch data:", err);
      toast.error("⚠️ Terjadi kesalahan saat memuat data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Gunakan cancelDelete dalam tombol batal
  const cancelDelete = () => {
    setDeleteData(null);
  };

  // ✅ Gunakan handleDelete dalam tombol hapus
  const handleDelete = async () => {
    if (!deleteData) return;

    try {
      const res = await fetch("/api/delput-pre", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no: deleteData }),
      });

      const data = await res.json();
      if (data.status === "success") {
        toast.success("✅ Data berhasil dihapus!");
        fetchData();
        setDeleteData(null);
      } else {
        toast.error(`❌ Gagal menghapus: ${data.message}`);
      }
    } catch (err) {
      console.error("⚠️ Error saat menghapus data:", err);
      toast.error("⚠️ Terjadi kesalahan saat menghapus data");
    }
  };

  // ✅ Hitung total jumlah setelah `dataList` diinisialisasi
  const totalAmount = calculateTotal(dataList).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

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

      <motion.div
        className="mt-8 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          📋 Daftar Data (Sheet1)
        </h2>
        <table className="min-w-full bg-slate-600 rounded-lg border p-2">
          <thead>
            <tr>
              {[
                "NO",
                "DATE",
                "JENIS BIAYA",
                "KETERANGAN",
                "JUMLAH (Rp)",
                "KLAIM OLEH",
                "STATUS",
                "AKSI",
              ].map((header) => (
                <th key={header} className="p-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            {dataList.map((item) => (
              <tr key={item.no}>
                <td className="p-2 border text-center">{item.no}</td>
                <td className="p-2 border text-center">
                  {formatDate(item.date)}
                </td>
                <td className="p-2 border">{item.jenisBiaya}</td>
                <td className="p-2 border">{item.keterangan}</td>
                <td className="p-2 border text-right">
                  {parseFloat(item.jumlah).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="p-2 border">{item.klaimOleh}</td>
                <td className="p-2 border text-center">
                  <a
                    href={item.status}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    <Eye className="items-center mx-auto" />
                  </a>
                </td>
                <td className="p-2 border flex gap-2 justify-center">
                  <button
                    onClick={() => setEditData(item)}
                    className="text-green-500"
                  >
                    <Edit2 className="hover:scale-90 duration-700 ease-in-out w-6 h-6 hover:bg-transparent hover:outline-4 " />
                  </button>
                  <button
                    onClick={() => setDeleteData(item.no)}
                    className="text-red-500"
                  >
                    <Trash2 className="hover:scale-90 duration-700 ease-in-out w-6 h-6 hover:bg-transparent hover:outline-4 " />
                  </button>
                </td>
              </tr>
            ))}
          </motion.tbody>

          {/* 🔹 Tambahkan total jumlah di bawah tabel */}
          <tfoot>
            <tr className="font-bold bg-gray-600">
              <td colSpan={8} className="p-2 border text-right text-pretty font-semibold">
                TOTAL: {totalAmount}
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>

      {/* Modal Konfirmasi Delete */}
      {deleteData !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="flex justify-between mt-4">
              <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
                Hapus
              </button>
              <button onClick={cancelDelete} className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
