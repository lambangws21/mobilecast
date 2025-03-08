'use client';

import React, { useEffect, useState } from 'react';
import TournamentCard from './TournamentCard';
import { Tournament } from '@/types/mobile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';

const TournamentCardContainer: React.FC = () => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the latest tournament data
  const fetchTournamentData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/get-tournament');
      const result: { status: string; data: Tournament } = await res.json();
      if (result.status === 'success' && result.data) {
        setTournament(result.data);
        toast.success('Tournament data updated successfully!');
      } else {
        setError('Failed to fetch tournament data.');
        toast.error('Failed to fetch tournament data.');
      }
    } catch  {
      setError('Error fetching tournament data.');
      toast.error('Error fetching tournament data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh data every 10 minutes (600,000 ms)
  useEffect(() => {
    fetchTournamentData(); // Initial fetch
    const refreshInterval = setInterval(fetchTournamentData, 600000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="relative p-4 bg-green-100/95 rounded-xl shadow-sm text-green-800 flex flex-col items-center justify-center">
      {isLoading ? (
        <Loader2 className="animate-spin w-10 h-10 text-green-800" />
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : tournament ? (
        <TournamentCard tournament={tournament} />
      ) : (
        <p className="text-gray-500 text-sm">No tournament data available.</p>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TournamentCardContainer;
