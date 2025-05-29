"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DataRowOperasi } from "@/types/dataoperasi";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: () => void;
  editData?: DataRowOperasi | null;
}

export default function FormModal({ isOpen, onClose, onUpload, editData }: FormModalProps) {
  const [formData, setFormData] = useState<Omit<DataRowOperasi, "no" | "status">>({
    date: "",
    rumahSakit: "",
    tindakanOperasi: "",
    operator: "",
    jumlah: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        date: editData.date,
        rumahSakit: editData.rumahSakit,
        tindakanOperasi: editData.tindakanOperasi,
        operator: editData.operator,
        jumlah: editData.jumlah,
      });
    } else {
      setFormData({ date: "", rumahSakit: "", tindakanOperasi: "", operator: "", jumlah: 0 });
      setFile(null);
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "jumlah" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const method = editData ? "PUT" : "POST";
    const bodyData = {
      ...formData,
      no: editData?.no,
      fileName: file?.name || "",
      fileBase64: file ? await toBase64(file) : "",
      mimeType: file?.type || "",
    };

    await fetch("/api/post-operasi", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    setIsLoading(false);
    onUpload();
    onClose();
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-bold text-center mb-4 text-slate-600">
          {editData ? "✏️ Edit Data Operasi" : "📋 Tambah Data Operasi"}
        </h2>

        {/* 🚀 FORM INPUT */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-600" required />
          <input type="text" name="rumahSakit" value={formData.rumahSakit} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-600" placeholder="🏥 Rumah Sakit" required />
          <input type="text" name="tindakanOperasi" value={formData.tindakanOperasi} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-600" placeholder="🔬 Tindakan Operasi" required />
          <input type="text" name="operator" value={formData.operator} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-600" placeholder="👨‍⚕️ Operator" required />
          <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-600" placeholder="💰 Jumlah (Rp)" required />

          {/* 🚀 UPLOAD FILE PREVIEW */}
          <div className="w-full p-2 border rounded-lg">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-slate-600" />
            {file && (
              <p className="text-sm text-gray-500 mt-2">
                📎 {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {/* 🚀 SUBMIT BUTTON */}
          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-slate-50 py-2 rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? "Mengunggah..." : editData ? "💾 Simpan Perubahan" : "✅ Simpan"}
          </motion.button>
        </form>

        {/* ❌ CLOSE BUTTON */}
        <motion.button
          onClick={onClose}
          className="text-red-500 mt-3 block mx-auto hover:text-red-700"
          whileHover={{ scale: 1.1 }}
        >
          ❌ Tutup
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
