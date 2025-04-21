
export interface Sport {
  id: string;
  name: string;
  icon: string; // Icon name
  color: string;
  venues: string[];
}

export interface Talent {
  id: string;
  name: string;
  age: number;
  sport: string;
  level: string;
  achievements: string[];
  rating: number;
  image: string;
}

export const sports: Sport[] = [
  {
    id: "football",
    name: "Football",
    icon: "trophy",
    color: "talent-blue",
    venues: ["Stadium Arena", "Sports Complex", "University Field"]
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "trophy",
    color: "talent-orange",
    venues: ["Indoor Court", "Community Center", "School Gymnasium"]
  },
  {
    id: "swimming",
    name: "Swimming",
    icon: "trophy",
    color: "talent-indigo",
    venues: ["Olympic Pool", "Aquatic Center", "Community Pool"]
  },
  {
    id: "tennis",
    name: "Tennis",
    icon: "trophy",
    color: "talent-green",
    venues: ["Tennis Club", "Community Courts", "Sports Center"]
  },
  {
    id: "athletics",
    name: "Athletics",
    icon: "trophy",
    color: "talent-purple",
    venues: ["Athletics Track", "Stadium", "Sports Field"]
  },
  {
    id: "cricket",
    name: "Cricket",
    icon: "trophy",
    color: "talent-red",
    venues: ["Cricket Stadium", "Oval Ground", "Academy Field"]
  }
];

export const talents: Talent[] = [
  {
    id: "t1",
    name: "Alex Johnson",
    age: 16,
    sport: "Football",
    level: "Intermediate",
    achievements: ["Regional Champion 2024", "School Team Captain"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302"
  },
  {
    id: "t2",
    name: "Samantha Lee",
    age: 15,
    sport: "Swimming",
    level: "Advanced",
    achievements: ["National Junior Finalist", "100m Freestyle Record"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4"
  },
  {
    id: "t3",
    name: "Miguel Rodriguez",
    age: 17,
    sport: "Basketball",
    level: "Advanced",
    achievements: ["MVP School Tournament", "All-Star Selection"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2"
  },
  {
    id: "t4",
    name: "Priya Patel",
    age: 14,
    sport: "Tennis",
    level: "Intermediate",
    achievements: ["Junior Tournament Runner-up", "Tennis Academy Scholar"],
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3"
  }
];
