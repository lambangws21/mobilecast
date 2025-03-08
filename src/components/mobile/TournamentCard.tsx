import React from 'react';
import { Tournament } from '@/types/mobile';

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  return (
    <div className="relative p-4 bg-green-100/95 rounded-xl shadow-sm text-green-800 flex flex-col items-center justify-center">
      {/* Badge alert in the top-right corner */}
      <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-semibold flex items-center justify-center h-6 w-6 rounded-full animate-pulse">
        New
      </div>
      <p className="text-sm sm:text-base md:text-lg font-bold text-center uppercase">
        {tournament.name}
      </p>
      <p className="text-md sm:text-lg md:text-xl font-extrabold">
        {tournament.entryFee !== undefined
          ? tournament.entryFee.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          : ''}
      </p>
    </div>
  );
};

export default TournamentCard;
