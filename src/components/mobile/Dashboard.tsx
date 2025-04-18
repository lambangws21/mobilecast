"use client";

import DashboardLayout from "@/layout/DashboardLayout";
import { Header } from "@/components/mobile/Header";
import { Sidebar } from "@/components/mobile/Sidebar";
import NewProfileCard from "@/components/mobile/new-peofilecard";
import StatsGrid from "@/components/mobile/StatsGrid";
import NewTransactionInfo from "@/components/mobile/NewTransactionInfo";
import { fetchDashboardData } from "@/lib/mobile";
import { DashboardData } from "@/types/mobile";
import { useEffect, useState } from "react";
import DataList from "@/components/mobile/NewDataTableAdvance";
import DataOperasi from "@/components/mobile/dataOperasi/NewDataTable";
import LoadingThreeDotsPulse from "../loading/loading-three-ball";

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
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingThreeDotsPulse/>
      </div>
    );
  if (!data)
    return (
      <div className="h-screen flex items-center justify-center">
        Failed to load data
      </div>
    );

  return (
    <DashboardLayout>
      <Header />
      <div className="p-4 space-y-4 pb-24 w-full">
        <NewProfileCard/>
        <StatsGrid
          stats={data.stats}
          tournament={data.tournament}
          totalAmount={data.stats.totalAmount} 
        />

        <div className="p-4 bg-white rounded-xl shadow-sm">
          <p className="font-semibold text-slate-800 mb-2">
            Transaction History
          </p>
          <NewTransactionInfo />
        </div>
        <div className="p-1 bg-white rounded-xl shadow-sm">
          <DataList />
        </div>
        <div className="p-0 bg-white rounded-xl shadow-sm">
          <DataOperasi />
        </div>
      </div>
      <Sidebar />
    </DashboardLayout>
  );
}
