"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2Icon,
  CheckCircleIcon,
  XCircleIcon,
  FilePlusIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";

export type ActionStatus = "idle" | "adding" | "loading" | "success" | "error";

interface ActionButtonProps {
  onAction: () => Promise<void>;
  children?: ReactNode;
  className?: string;
  addingLabel?: string;
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
}

export default function ActionButton({
  onAction,
  children = "Kirim",
  className = "",
  addingLabel = "Menambahkan data...",
  loadingLabel = "Memproses...",
  successLabel = "Berhasil!",
  errorLabel = "Gagal!",
}: ActionButtonProps) {
  const [status, setStatus] = useState<ActionStatus>("idle");

  const handleClick = async () => {
    setStatus("adding");
    await new Promise((r) => setTimeout(r, 800));

    try {
      setStatus("loading");
      await onAction();
      setStatus("success");
      await new Promise((r) => setTimeout(r, 1200));
    } catch {
      setStatus("error");
      await new Promise((r) => setTimeout(r, 1500));
    } finally {
      setStatus("idle");
    }
  };

  const renderContent = () => {
    switch (status) {
      case "adding":
        return (
          <>
            <FilePlusIcon className="w-5 h-5 text-yellow-300 animate-bounce" />
            {addingLabel}
          </>
        );
      case "loading":
        return (
          <>
            <Loader2Icon className="w-5 h-5 animate-spin" />
            {loadingLabel}
          </>
        );
      case "success":
        return (
          <>
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
            {successLabel}
          </>
        );
      case "error":
        return (
          <>
            <XCircleIcon className="w-5 h-5 text-red-400" />
            {errorLabel}
          </>
        );
      default:
        return children;
    }
  };

  return (
    <motion.button
      whileHover={status === "idle" ? { scale: 1.03 } : {}}
      whileTap={status === "idle" ? { scale: 0.97 } : {}}
      onClick={status === "idle" ? handleClick : undefined}
      disabled={status !== "idle"}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium tracking-wide shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={status}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          {renderContent()}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
