// "use client";

// import { useEffect, useState } from "react";
// import { fetchDashboardData } from "@/lib/mobile";
// import { DashboardData } from "@/types/mobile";

// export default function Dashboard() {
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const fetchedData = await fetchDashboardData();
//         setData(fetchedData);
//       } catch (err) {
//         setError("Gagal mengambil data");
//         console.error("❌ Fetch error:", err);
//       }
//     }

//     loadData();
//   }, []);

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!data) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1 className="text-lg font-bold">{data.profile.name}</h1>
//       <p>{data.profile.level}</p>
//       <p>⭐️ {data.profile.stars}</p>

//       <h2 className="mt-4 font-semibold">Transactions</h2>
//       <ul className="space-y-2">
//         {data.transactions.map((txn, index) => (
//           <li key={index} className="border p-2 rounded">
//             <p>Date: {txn.date}</p>
//             <p>Amount: {txn.amount}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
