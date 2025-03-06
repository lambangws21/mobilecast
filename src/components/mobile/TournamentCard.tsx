"use client";

import React, { useEffect, useState } from "react";
import { Tournament } from "@/types/mobile";

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentCard({ tournament: initialTournament }: TournamentCardProps) {
  const [tournament, setTournament] = useState<Tournament>(initialTournament);

  // Fungsi untuk fetch data tournament terbaru
  async function fetchTournamentData() {
    try {
      const res = await fetch("/api/get-tournament");
      const result: { status: string; data: Tournament } = await res.json();
      if (result.status === "success") {
        setTournament(result.data);
      } else {
        console.error("Failed to fetch tournament data");
      }
    } catch (error) {
      console.error("Error fetching tournament data", error);
    }
  }

  // Auto refresh data setiap 10 menit (600.000 ms)
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchTournamentData();
    }, 2000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="relative p-4 bg-green-100 rounded-xl shadow-sm text-green-800 flex flex-col items-center justify-center">
      {/* Badge alert di sudut kanan atas */}
      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
        New
      </div>
      <p className="text-sm sm:text-base md:text-lg font-bold">{tournament.name}</p>
      <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">
        {tournament.entryFee.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </p>
    </div>
  );
}
