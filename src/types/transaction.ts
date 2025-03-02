export interface Transaction {
    no: number;
    date: string;
    jenisBiaya: string;
    keterangan: string;
    jumlah: number;
    klaimOleh: string;
    status: string;
  }
  
  export interface TransactionResponse {
    status: string;
    data: Transaction[];
    message?: string;
  }
  
  export   interface DataRow {
    no: number;
    date: string;
    jenisBiaya: string;
    keterangan: string;
    jumlah: number;  // ⬅️ ubah jadi string
    klaimOleh: string;
    status: string;
  }