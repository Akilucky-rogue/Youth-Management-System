
export type Evaluation = {
  id: number;
  title: string;
  sport: string;
  date: Date;
  expertName: string;
  skills: {
    technique: number;
    strength: number;
    speed: number;
    endurance: number;
    gameAwareness: number;
  };
  comments: string;
  status: "pending" | "completed";
};
