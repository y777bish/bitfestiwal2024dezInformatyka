export interface Question {
  id: number;
  question: string;
  options: string[];
}

export interface UserAnswers {
  [key: number]: string;
}

export interface HobbyCategories {
  [key: string]: string[];
}
