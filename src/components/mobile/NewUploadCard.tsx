"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "./ProfileCard";
import UploadForm from "@/components/sheets-pre/NewUploadForm";
import AddDataButton from "@/components/ui/AddButton"; // Komponen Button custom Anda
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoaderCircle, CircleX } from "lucide-react";
import { Profile } from "@/types/mobile";

interface ProfileWithFormProps {
  profile: Profile;
}

export default function ProfileWithForm({ profile }: ProfileWithFormProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => setFormOpen((prev) => !prev);

  // Callback dipanggil setelah data berhasil disimpan
  const handleUpload = () => {
    setFormOpen(false);
    toast.success("Data berhasil disimpan!", { transition: Slide });
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg shadow-sm bg-slate-200/70 relative">
      <ProfileCard profile={profile} />
      <div className="mt-4 flex justify-start">
        <AddDataButton onClick={toggleForm} className="flex items-center gap-2 rounded-full" />
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 flex justify-center items-center z-50 bg-slate-900/50 bg-opacity-50"
          >
            <div className="bg-slate-100/90 p-10 rounded-lg shadow-lg w-11/12 max-w-md relative">
              <UploadForm 
                onUpload={handleUpload} 
                editData={null} 
                onLoadingChange={setIsLoading} 
              />
              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xs"
              >
                <CircleX size={25} className="hover:text-gray-800" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoaderCircle className="animate-spin w-20 h-20 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Slide}
        className="absolute top-2 right-2"
      />
    </div>
  );
}
