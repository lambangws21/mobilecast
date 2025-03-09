"use client";

import { Stats, Tournament } from "@/types/mobile";
import TournamentCard from "./TournamentCard";
import AmountCard from "./AmountCard";

interface StatsGridProps {
  stats: Stats;
  tournament: Tournament;
  totalAmount: number; // ✅ Pastikan totalAmount dideklarasikan di props
}

export default function StatsGrid({ stats, tournament, totalAmount }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Tournament Card */}
      <div className="p-2 bg-blue-100 rounded-xl shadow-sm text-blue-800">
        <TournamentCard tournament={tournament} />
      </div>

      {/* Amount Card */}
      <div className="p-4 bg-red-100 rounded-xl shadow-sm text-red-800">
        <AmountCard totalAmount={totalAmount} />
      </div>

      {/* Ranking Card */}
      <div className="p-4 bg-purple-100 rounded-xl shadow-sm text-purple-800">
        <p className="text-xs">Ranking</p>
        <p className="text-xl font-bold">{stats.ranking}</p>
        <p className="text-xs">Top 10%</p>
      </div>

      {/* Following Card */}
      <div className="p-4 bg-orange-100 rounded-xl shadow-sm text-orange-800">
        <p className="text-xs">Following</p>
        <p className="text-xl font-bold">{stats.following}</p>
        <p className="text-xs">students</p>
      </div>
    </div>
  );
}
