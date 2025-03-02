import React from "react";
import { motion} from "framer-motion";
interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, icon, children, className }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-4 md:p-6 rounded-xl shadow-md bg-white ${className}`}
    >
      {title && (
        <div className="flex items-center space-x-2 mb-4">
          {icon && <div className="text-gray-500">{icon}</div>}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
      )}
      {children}
    </motion.div>
  );
}
