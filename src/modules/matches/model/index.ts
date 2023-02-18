export interface Match {
  id: string;
  club: string;
  dateAndTime: DateTime;
  level?: string;
  costPerPlayer?: number;
  players: Player[];
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
