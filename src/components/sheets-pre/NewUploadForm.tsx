"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormDataType {
  id?: string;
  date: string;
  jenisBiaya: string;
  keterangan: string;
  jumlah: string;
  klaimOleh: string;
}

interface UploadFormProps {
  onUpload: () => void;
  onClose: () => void;  // ✅ Tambahkan ini
  editData?: FormDataType | null;
}


export default function UploadForm({ onUpload, editData }: UploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    date: "",
    jenisBiaya: "",
    keterangan: "",
    jumlah: "",
    klaimOleh: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const resetForm = () => {
    setFormData({
      date: "",
      jenisBiaya: "",
      keterangan: "",
      jumlah: "",
      klaimOleh: "",
    });
    setFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    toast.info("📤 Mengunggah data...");

    const method = formData.id ? "PUT" : "POST";
    const apiUrl = "/api/sheets-pre";

    const sendRequest = async (fileBase64: string | null = null) => {
      try {
        const res = await fetch(apiUrl, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            fileName: file?.name || "",
            fileBase64: fileBase64 || "",
            mimeType: file?.type || "",
          }),
        });

        const data = await res.json();
        setIsUploading(false);

        if (data.status === "success") {
          toast.success(`✅ ${formData.id ? "Data diperbarui" : "Data ditambahkan"} berhasil!`);
          onUpload();
          setTimeout(() => {
            resetForm();
          }, 500);
        } else {
          toast.error(`❌ Gagal: ${data.message}`);
        }
      } catch  {
        toast.error("⚠️ Terjadi kesalahan saat mengirim data");
        setIsUploading(false);
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(",")[1];
        if (!base64Data) {
          toast.error("❌ Gagal mengonversi file ke Base64.");
          setIsUploading(false);
          return;
        }
        await sendRequest(base64Data);
      };
      reader.readAsDataURL(file);
    } else {
      sendRequest();
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-3 p-4 border rounded-lg bg-white/10 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="jenisBiaya"
          placeholder="Jenis Biaya"
          value={formData.jenisBiaya}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="keterangan"
          placeholder="Keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah (Rp)"
          value={formData.jumlah}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="klaimOleh"
          placeholder="Klaim Oleh"
          value={formData.klaimOleh}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          {isUploading ? "Mengunggah..." : formData.id ? "Simpan Perubahan" : "Unggah & Simpan"}
        </button>
      </motion.form>

      {/* Loading Screen */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoaderCircle className="animate-spin w-10 h-10 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
