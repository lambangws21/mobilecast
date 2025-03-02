"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EditForm from "@/components/sheets-pre/EditForm";
import { Trash2, Edit2, Eye, XCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { Transaction } from "@/types/transaction";

// Helper format tanggal ke DD-MM-YYYY
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("id-ID");
};

// Konversi link Google Drive ke direct preview link
const convertDriveLink = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  return match ? `https://drive.google.com/uc?id=${match[1]}` : url;
};

export default function ListData() {
  const [dataList, setDataList] = useState<Transaction[]>([]);
  const [editData, setEditData] = useState<Transaction | null>(null);
  const [deleteData, setDeleteData] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/get-data-pre");
      const data = await res.json();
      if (data.status === "success") {
        setDataList(data.data || []);
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
    if (deleteData === null) return;

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
      } else {
        toast.error(`❌ Gagal menghapus: ${result.message}`);
      }
    } catch {
      toast.error("⚠️ Terjadi kesalahan saat menghapus data");
    } finally {
      setDeleteData(null);
    }
  };

  const totalAmount = dataList
    .reduce((acc, item) => acc + (parseFloat(String(item.jumlah)) || 0), 0)
    .toLocaleString("id-ID", { style: "currency", currency: "IDR" });

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
        className="mt-8 w-full max-w-5xl overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-slate-700">
          📋 Daftar Transaksi
        </h2>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-slate-700 text-white">
              <tr>
                {["Tanggal", "Jenis Biaya", "Keterangan", "Jumlah (Rp)", "Klaim Oleh", "Bukti Foto", "Aksi"].map((header) => (
                  <th key={header} className="p-3 text-left">{header}</th>
                ))}
              </tr>
            </thead>

            <motion.tbody initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
              {dataList.map((item) => (
                <tr key={item.no} className="border-b hover:bg-slate-50 transition">
                  <td className="p-3">{formatDate(item.date)}</td>
                  <td className="p-3">{item.jenisBiaya}</td>
                  <td className="p-3">{item.keterangan}</td>
                  <td className="p-3 text-right">
                    {parseFloat(String(item.jumlah)).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                  </td>
                  <td className="p-3">{item.klaimOleh}</td>
                  <td className="p-3 text-center">
                    {item.status ? (
                      <button
                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        onClick={() => setPreviewImage(convertDriveLink(item.status))}
                      >
                        <Eye className="w-5 h-5" />
                        Lihat
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => setEditData(item)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteData(item.no)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </motion.tbody>

            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td colSpan={7} className="p-3 text-right">
                  TOTAL: {totalAmount}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Modal Konfirmasi Hapus */}
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

      {/* Modal Preview Foto */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <button className="absolute top-2 right-2 text-red-500" onClick={() => setPreviewImage(null)}>
              <XCircle className="w-6 h-6" />
            </button>
            <Image
              src={previewImage}
              alt="Bukti Foto"
              width={400}
              height={400}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
