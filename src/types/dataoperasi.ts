export interface DataRow {
  no: number;
  date: string;
  rumahSakit: string;
  jenisBiaya: string;
  tindakanOperasi: string;
  operator: string;
  keterangan: string;
  klaimOleh: string;
  jumlah: number;
  status: string;
}


export interface DataRowOperasi {
  no: number;
  date: string;
  rumahSakit: string;
  tindakanOperasi: string;
  operator: string;
  jumlah: number;
  status: string;

}