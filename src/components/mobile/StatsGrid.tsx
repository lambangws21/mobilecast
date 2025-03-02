
"use client";

import { Stats } from "@/types/mobile";

interface StatsGridProps {
  stats: Stats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-4 bg-blue-100 rounded-xl shadow-sm text-blue-800">
        <p className="text-xs">Progress</p>
        <p className="text-xl font-bold">{stats.progress}</p>
        <p className="text-xs">Learned words</p>
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
