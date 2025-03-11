"use client";

import React, { useEffect, useRef } from "react";
import { DataRow } from "@/types/transaction";

// Fungsi format tanggal (DD-MM-YYYY)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
};

interface CanvasTransactionInfoProps {
  dataList: DataRow[];
  currentIndex: number;
}

const CanvasTransactionInfo: React.FC<CanvasTransactionInfoProps> = ({
  dataList,
  currentIndex,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (dataList.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Bersihkan canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentData = dataList[currentIndex];

    // Atur gaya teks
    ctx.font = "14px Arial";
    ctx.fillStyle = "#333";

    // Gambar background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tulis informasi transaksi
    ctx.fillStyle = "#333";
    ctx.fillText(`Date: ${formatDate(currentData.date)}`, 10, 30);
    ctx.fillText(`Jenis: ${currentData.jenisBiaya}`, 10, 55);
    ctx.fillText(`Info: ${currentData.keterangan}`, 10, 80);
    const jumlahFormatted = Number(currentData.jumlah).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    ctx.fillText(`Jumlah: ${jumlahFormatted}`, 10, 105);
    ctx.fillText(`Klaim: ${currentData.klaimOleh}`, 10, 130);
    ctx.fillText(
      `Status: ${currentData.status ? "Available" : "-"}`,
      10,
      155
    );
    
    // Contoh: gambar sebuah ikon sederhana untuk status (bisa dikembangkan lagi)
    if (currentData.status) {
      ctx.beginPath();
      ctx.arc(350, 40, 15, 0, 2 * Math.PI);
      ctx.fillStyle = "#3b82f6"; // biru
      ctx.fill();
      ctx.closePath();
    }
  }, [dataList, currentIndex]);

  return <canvas ref={canvasRef} width={400} height={180} className="border rounded-md" />;
};

export default CanvasTransactionInfo;
