"use client";

import { Stats, Tournament } from "@/types/mobile";
import TournamentCard from "./TournamentCard";

interface StatsGridProps {
  stats: Stats;
  tournament: Tournament;
}

export default function StatsGrid({ stats, tournament }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-2 bg-blue-100 rounded-xl shadow-sm text-blue-800">
        <TournamentCard tournament={tournament} />
      </div>
      <div className="p-4 bg-red-100 rounded-xl shadow-sm text-red-800">
        <p className="text-xs">Arena Score</p>
        <p className="text-xl font-bold">{stats.arenaScore}</p>
        <p className="text-xs">out of 100</p>
      </div>
      <div className="p-4 bg-purple-100 rounded-xl shadow-sm text-purple-800">
        <p className="text-xs">Ranking</p>
        <p className="text-xl font-bold">{stats.ranking}</p>
        <p className="text-xs">Top 10%</p>
      </div>
      <div className="p-4 bg-orange-100 rounded-xl shadow-sm text-orange-800">
        <p className="text-xs">Following</p>
        <p className="text-xl font-bold">{stats.following}</p>
        <p className="text-xs">students</p>
      </div>
    </div>
  );
}
