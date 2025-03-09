"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Profile } from "@/types/mobile";
import { User } from "lucide-react";
import { useState } from "react";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  return (
    <motion.div
      className="p-4 bg-white rounded-xl shadow-lg flex items-center space-x-4 cursor-pointer transform-gpu"
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        x.set(mouseX);
        y.set(mouseY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
