export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: number; // 1 to 10
  category: string;
}

export interface LeaderboardEntry {
  id: string;
  display_name: string;
  score: number;
  created_at: string;
}

export interface Lead {
  id?: string;
  email?: string;
  phone?: string;
  type: 'email' | 'phone';
  score: number;
  created_at?: string;
}
