export interface Match {
  id?: string;
  club: string;
  startTime: Date;
  duration: number;
  level?: string;
  costPerPlayer?: number;
  players: string[];
}

export interface Player {
  id: string;
  name: string;
  nickname?: string;
  phone?: string;
}

export interface DateTime {
  start: Date | null;
  end: Date | null;
}
