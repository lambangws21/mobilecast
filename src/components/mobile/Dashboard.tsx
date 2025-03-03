"use client";

import DashboardLayout from '@/layout/DashboardLayout';
import { Header } from '@/components/mobile/Header';
import { Sidebar } from '@/components/mobile/Sidebar';
import ProfileCard from '@/components/mobile/UploadCard';
import TournamentCard from '@/components/mobile/TournamentCard';
import StatsGrid from '@/components/mobile/StatsGrid';
import TransactionTable  from '@/components/mobile/TransactionTable';
import { fetchDashboardData } from '@/lib/mobile';
import { DashboardData } from '@/types/mobile';
import { useEffect, useState } from 'react';
import DataList from "@/components/sheets-pre/NewListData";
import {  Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Anda bisa menambahkan state error jika diperlukan untuk menampilkan pesan ke user
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className='animate-spin h-32 w-32'/></div>;
  if (!data) return <div className="h-screen flex items-center justify-center">Failed to load data</div>;

  return (
    <DashboardLayout>
      <Header />
      <div className="p-4 space-y-4 pb-24 w-full">
        <ProfileCard profile={data.profile} />
        <TournamentCard tournament={data.tournament} />
        <StatsGrid stats={data.stats} />
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <p className="font-semibold text-slate-800 mb-2">Transaction History</p>
          <TransactionTable transactions={data.transactions} />
        </div>
        <div className="p-1 bg-white rounded-xl shadow-sm">
        <DataList />
        </div>
       
      </div>
      <Sidebar />
    </DashboardLayout>
  );
}
