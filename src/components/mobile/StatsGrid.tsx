"use client";

import React from "react";
import { Stats, Tournament } from "@/types/mobile";
import TournamentCard from "./TournamentCard";
import AmountCard from "./AmountCard";
import TotalOperasiCard from "./dataAdvance/TotalOperasiCard";
import TotalAmountCard from "./dataAdvance/TotalAdvancetCard";

interface StatsGridProps {
  stats: Stats;
  tournament: Tournament;
  totalAmount: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({  tournament, totalAmount }) => {
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
        <TotalOperasiCard />
      </div>

      {/* Following Card */}
      <div className="p-4 bg-orange-100 rounded-xl shadow-sm text-orange-800">
      <TotalAmountCard />
      </div>
    </div>
  );
};

export default StatsGrid;
