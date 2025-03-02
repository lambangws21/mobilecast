'use client';
import { CircleX, LoaderCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditFormProps {
  editData: DataRow | null;
  onClose: () => void;
  onUpdate: () => void;
}

interface DataRow {
  no: number;
  date: string;
  jenisBiaya: string;
  keterangan: string;
  jumlah: number;
  klaimOleh: string;
}

export default function EditForm({ editData, onClose, onUpdate }: EditFormProps) {
  const [formData, setFormData] = useState<DataRow | null>(editData);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsUpdating(true);

    try {
      const res = await fetch('/api/delput-pre', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === 'success') {
        toast.success(`✅ Data berhasil diperbarui!`);
        onUpdate();
        setTimeout(() => {
          onClose(); // Menutup form setelah sukses
        }, 500);
      } else {
        toast.error(`❌ Gagal: ${data.message}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`⚠️ Terjadi kesalahan saat mengupdate data`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={6000} />

      {formData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-600 p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-lg font-bold mb-4">✏️ Edit Data</h2>
            <button
              onClick={!isUpdating ? onClose : undefined} 
              className="absolute top-2 right-2 text-gray-900 hover:text-red-500"
              disabled={isUpdating}
            >
              <CircleX />
            </button>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-700" required />
              <input type="text" name="jenisBiaya" value={formData.jenisBiaya} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-700" required />
              <input type="text" name="keterangan" value={formData.keterangan} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-700" required />
              <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-700" required />
              <input type="text" name="klaimOleh" value={formData.klaimOleh} onChange={handleChange} className="w-full p-2 border rounded-lg text-slate-700" required />
              
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition" disabled={isUpdating}>
                {isUpdating ? 'Mengupdate...' : 'Simpan Perubahan'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Full-Screen Loading Overlay */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <LoaderCircle className="animate-spin w-16 h-16 text-white" />
        </div>
      )}
    </>
  );
}
