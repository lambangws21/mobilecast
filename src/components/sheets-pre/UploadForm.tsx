'use client';
import { CircleX, LoaderCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  editData?: FormDataType | null;
}

export default function UploadForm({ onUpload, editData }: UploadFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    date: '',
    jenisBiaya: '',
    keterangan: '',
    jumlah: '',
    klaimOleh: '',
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      setIsOpen(true);
    }
  }, [editData]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => !isUploading && setIsOpen(false);

  const resetForm = () => {
    setFormData({ date: '', jenisBiaya: '', keterangan: '', jumlah: '', klaimOleh: '' });
    setFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    const method = formData.id ? 'PUT' : 'POST';
    const apiUrl = '/api/sheets-pre';

    const sendRequest = async (fileBase64: string | null = null) => {
      // 🔹 Debug: Pastikan data yang dikirim ke API benar
      console.log("📤 Data yang dikirim:", {
        ...formData,
        fileName: file?.name || '',
        fileBase64: fileBase64 || '',
        mimeType: file?.type || '',
      });

      const res = await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fileName: file?.name || '',
          fileBase64: fileBase64 || '',
          mimeType: file?.type || '',
        }),
      });

      const data = await res.json();
      setIsUploading(false);

      if (data.status === 'success') {
        toast.success(`✅ ${formData.id ? 'Data diperbarui' : 'Data ditambahkan'} berhasil!`);
        onUpload();
        setTimeout(() => {
          resetForm();
          closeModal();
        }, 500);
      } else {
        toast.error(`❌ Gagal: ${data.message}`);
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
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
      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        {editData ? 'Edit Data' : '+ Tambah Data'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-600 p-6 rounded-lg shadow-lg w-96 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-4">{editData ? '✏️ Edit Data' : '📤 Tambah Data & Upload File'}</h2>
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-900 hover:text-red-500">
                <CircleX size={20} />
              </button>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
                <input type="text" name="jenisBiaya" placeholder="Jenis Biaya" value={formData.jenisBiaya} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-900" required />
                <input type="text" name="keterangan" placeholder="Keterangan" value={formData.keterangan} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-900" required />
                <input type="number" name="jumlah" placeholder="Jumlah (Rp)" value={formData.jumlah} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-900" required />
                <input type="text" name="klaimOleh" placeholder="Klaim Oleh" value={formData.klaimOleh} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-900" required />
                <input type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full p-2 border rounded-lg text-slate-900" required />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  {isUploading ? 'Mengunggah...' : formData.id ? 'Simpan Perubahan' : 'Unggah & Simpan'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUploading && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoaderCircle className="animate-spin w-20 h-20 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
