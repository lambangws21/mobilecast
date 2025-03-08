import React from "react";
import { motion } from "framer-motion";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ isOpen, onClose, onDelete }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div className="bg-white p-6 rounded-lg">
        <p>Apakah anda yakin ingin menghapus data ini?</p>
        <div className="mt-4 flex gap-2">
          <button onClick={onDelete} className="bg-red-500 text-white">Hapus</button>
          <button onClick={onClose} className="bg-gray-500 text-white">Batal</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
