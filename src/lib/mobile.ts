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

  // Ambil row terbaru dari data yang diambil (asumsi: data diurutkan sehingga elemen terakhir adalah yang terbaru)
  const latestRow = rawData.data[rawData.data.length - 1];

  // Hitung totalAmount dengan menjumlahkan properti jumlah dari seluruh data
  const totalAmount = rawData.data.reduce(
    (acc, row) => acc + (Number(row.jumlah) || 0),
    0
  );

  return {
    totalAmount: totalAmount, // Menambahkan properti totalAmount di level teratas
    profile: {
      name: "Herlambang Ws",
      level: "Intermediate",
      stars: 2,
    },
    tournament: {
      name: latestRow.jenisBiaya,
      entryFee: Number(latestRow.jumlah), // Entry fee diambil dari data terbaru
      endDate: latestRow.date, // Anda bisa menggantinya dengan formatDate(latestRow.date) jika diinginkan
    },
    stats: {
      progress: rawData.data.length,
      arenaScore: 77,
      ranking: 1239,
      following: 10,
      totalAmount: totalAmount, // Juga disertakan di dalam stats jika diperlukan
    },
    transactions: rawData.data.map((row) => ({
      date: formatDate(row.date),
      jenisBiaya: row.jenisBiaya,
      jumlah: row.jumlah.toString(), // Konversi ke string
      amount: row.jumlah,
    })),
  };
}
