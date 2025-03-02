"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "./ProfileCard";
import UploadForm from "@/components/sheets-pre/UploadForm";
import Button from "@/components/ui/button"; // Komponen Button custom Anda
import { Plus } from "lucide-react";
import { Profile } from "@/types/mobile";

interface ProfileWithFormProps {
  profile: Profile;
}

export default function ProfileWithForm({ profile }: ProfileWithFormProps) {
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => setFormOpen((prev) => !prev);

  return (
    <div className="max-w-md mx-auto p-4">
      <ProfileCard profile={profile} />
      <div className="mt-4 flex justify-end">
        <Button onClick={toggleForm} className="flex items-center gap-2">
          <Plus size={20} />
          Tambah Data
        </Button>
      </div>
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-4 overflow-hidden"
          >
            <UploadForm onUpload={() => setFormOpen(false)} editData={null} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
