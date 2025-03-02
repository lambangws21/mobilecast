"use client";
import { Tournament } from "@/types/mobile";

interface TournamentCardProps {
  tournament: Tournament;
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <div className="p-4 bg-green-100 rounded-xl shadow-sm text-green-800 relative">
      <p className="font-bold">{tournament.name}</p>
      <p className="text-xs">Entry fee: {tournament.entryFee} 💎</p>
      <p className="text-xs">End Date: {tournament.endDate}</p>
      <div className="absolute bottom-2 right-2 text-2xl">🏅</div>
    </div>
  );
}
