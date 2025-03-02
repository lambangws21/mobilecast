// types/mobile.ts
export interface DashboardProfile {
  name: string;
  level: string;
  stars: number;
}

export interface TournamentInfo {
  name: string;
  entryFee: number;
  endDate: string;
}

export interface StatsInfo {
  progress: number;
  arenaScore: number;
  ranking: number;
  following: number;
}

export interface Transaction {
  date: string;
  amount: string;
}

export interface DashboardData {
  profile: DashboardProfile;
  tournament: TournamentInfo;
  stats: StatsInfo;
  transactions: Transaction[];
}

export interface Profile {
  name: string;
  level: string;
  stars: number;
}
export interface Stats {
  progress: number;
  arenaScore: number;
  ranking: number;
  following: number;
}


export interface Tournament {
  name: string;
  entryFee: number;
  endDate: string;
}