export interface Achievement {
  name: string;
  achieved: boolean;
  date: string;
}

export interface User {
  achievements: Achievement[];
}
