// lib/fetchDashboardData.ts
import { DashboardData } from "@/types/mobile";
import { SheetRow } from "@/types/sheets";

// Helper format tanggal ke DD-MM-YYYY
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Antisipasi format error dari Sheet
  return date.toLocaleDateString("id-ID"); // Format otomatis sesuai lokal
}

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
      name: "Herlambang Ws",
      level: "Intermediate",
      stars: 2,
    },
    tournament: {
      name: "Autumn Cup",
      entryFee: 100,
      endDate: "10.07.2019",
    },
    stats: {
      progress: rawData.data.length,
      arenaScore: 77,
      ranking: 1239,
      following: 10,
    },
    transactions: rawData.data.map((row) => ({
      date: formatDate(row.date),
      jenisBiaya: row.jenisBiaya,
      jumlah: row.jumlah.toString(), // Konversi ke string
      amount: row.jumlah.toString(),           // Jika diperlukan, amount bertipe number
    })),
  };
}
