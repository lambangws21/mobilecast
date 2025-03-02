"use client";
import { motion } from "framer-motion";
import { Profile } from "@/types/mobile";
import { User } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-white rounded-xl shadow-sm flex items-center space-x-4"
    >
      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
        <User size={32} />
      </div>
      <div>
        <p className="font-semibold text-slate-800">{profile.name}</p>
        <p className="text-xs text-slate-500">
          {profile.level} {"⭐".repeat(profile.stars)}
        </p>
      </div>
    </motion.div>
  );
}
