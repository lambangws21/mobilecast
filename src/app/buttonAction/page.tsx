"use client";

import ActionButton from "@/components/mobile/AnimateButtonAction";
import ListData from "@/components/mobile/Table";
import DataColoms from "@/components/sheets-pre/ListData";

export default function ButtonActionPage() {
  const handleSubmit = async () => {
    // Simulasi proses async
    await new Promise((r) => setTimeout(r, 2000));

    // Simulasi error:
    // throw new Error("Simulasi gagal");
  };

  return (
    <main className="flex min-h-screen items-center justify-center flex-col bg-gray-100 gap-2 p-6">
      <ActionButton
        onAction={handleSubmit}
        successLabel="Tersimpan!"
        errorLabel="Gagal menyimpan"
        loadingLabel="Menyimpan..."
      >
        Simpan Data
      </ActionButton>
      <ActionButton
        onAction={handleSubmit}
        addingLabel="Menambahkan data..."
        loadingLabel="Menyimpan..."
        successLabel="Selesai!"
        errorLabel="Terjadi kesalahan"
      >
        Tambah data
      </ActionButton>

      <div>
        <ListData/>
      </div>

      <div>
        <DataColoms/>
      </div>
      
    </main>
  );
}
