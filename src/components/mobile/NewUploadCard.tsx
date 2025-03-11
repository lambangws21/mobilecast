"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "./ProfileCard";
import UploadForm from "@/components/sheets-pre/NewUploadForm";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleX } from "lucide-react";
import { Profile } from "@/types/mobile";

interface ProfileWithFormProps {
  profile: Profile;
}

export default function ProfileWithForm({ profile }: ProfileWithFormProps) {
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => setFormOpen((prev) => !prev);

  // Callback invoked after data is successfully saved
  const handleUpload = () => {
    setFormOpen(false);
    toast.success("✅ Data berhasil disimpan!", { transition: Slide });
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow-sm bg-slate-200/70 relative">
      <ProfileCard profile={profile} />

      {/* Tombol Tambah Data */}
      <div className="mt-4 flex justify-start">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          onClick={toggleForm}
          className="bg-green-400 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2"
        >
          Tambah Data
        </motion.button>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-9 rounded-lg shadow-lg w-[390px] h-[480px] max-w-md relative"
            >
              {/* Tombol Tutup Modal */}
              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-1 right-2 text-gray-600 hover:text-gray-800 text-xs mt-1 flex items-center hover:cursor-pointer hover:scale-110 transition"
              >
                <CircleX size={30} className="ml-4" />
              </button>

              {/* Form Upload */}
              <UploadForm
                onUpload={handleUpload}
                editData={null}
                onclose={() => setFormOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Slide}
        className="absolute top-2 right-2"
      />
    </div>
  );
}
