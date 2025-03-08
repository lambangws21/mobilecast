"use client";

import { Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionButton({ onEdit, onDelete }: ActionButtonProps) {
  return (
    <div className="flex justify-center space-x-3">
      <motion.button
        onClick={onEdit}
        className="text-yellow-500 hover:text-yellow-600 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Pencil size={18} />
      </motion.button>
      <motion.button
        onClick={onDelete}
        className="text-red-500 hover:text-red-600 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Trash size={18} />
      </motion.button>
    </div>
  );
}
