// lib/fetchDashboardData.ts
import { DashboardData } from "@/types/mobile";
import { SheetRow } from "@/types/sheets";

// Sesuaikan bentuk data berdasarkan hasil doGet dari Apps Script
export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch("/api/get-data-pre");

  if (!response.ok) {
    throw new Error(`Failed to fetch data, status: ${response.status}`);
  }

  const rawData: { status: string; data: SheetRow[] } = await response.json();

  if (rawData.status !== "success") {
    throw new Error("Failed to fetch valid data from Sheets");
  }

  // Mapping data agar sesuai dengan tipe DashboardData
  return {
    profile: {
      name: "Herlambang Ws",  // Statis karena tidak ada di Sheet1
      level: "Intermediate",  // Statis karena tidak ada di Sheet1
      stars: 2,                // Statis karena tidak ada di Sheet1
    },
    tournament: {
      name: "Autumn Cup",     // Statis (dummy)
      entryFee: 100,          // Statis (dummy)
      endDate: "10.07.2019",  // Statis (dummy)
    },
    stats: {
      progress: rawData.data.length,    // Total data jadi progress
      arenaScore: 77,                    // Statis (dummy)
      ranking: 1239,                      // Statis (dummy)
      following: 10,                      // Statis (dummy)
    },
    transactions: rawData.data.map((row) => ({
      date: formatDate(row.date),
      amount: `Rp${row.jumlah.toLocaleString("id-ID")}`
    })),
  };
}

// Helper format tanggal ke DD-MM-YYYY
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Antisipasi format error dari Sheet
  return date.toLocaleDateString("id-ID"); // Format otomatis sesuai lokal
}
