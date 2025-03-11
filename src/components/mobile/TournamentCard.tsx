"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tournament } from "@/types/mobile";

interface TournamentCardProps {
  tournament: Tournament;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("id-ID");
};

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.5 }}
      className="relative p-4 bg-green-100/95 rounded-xl shadow-sm text-green-800 flex flex-col items-center justify-center"
    >
      {/* Badge alert in the top-right corner */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
        className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-semibold flex items-center justify-center h-6 w-6 rounded-full animate-pulse"
      >
        New
      </motion.div>
      <p className="text-sm sm:text-base md:text-lg font-bold text-center uppercase mb-2">
        {tournament.name}
      </p>
      <p className="text-xs bg-amber-200 px-2 py-1 rounded-full">
        {formatDate(tournament.endDate)}
      </p>
      <p className="text-md sm:text-lg md:text-xl font-extrabold ">
        {tournament.entryFee !== undefined
          ? tournament.entryFee.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          : ""}
      </p>
    </motion.div>
  );
};

export default TournamentCard;
