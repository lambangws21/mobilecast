import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DataRowOperasi } from "@/types/dataoperasi";

export function exportToExcel(data: DataRowOperasi[], filename = "data-export.xlsx") {
  const formatted = data.map(row => ({
    No: row.no,
    Tanggal: row.date,
    tindakanOperasi: row.tindakanOperasi,
    Operator: row.operator,
    Jumlah: row.jumlah,
    Status: row.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, filename);
}
