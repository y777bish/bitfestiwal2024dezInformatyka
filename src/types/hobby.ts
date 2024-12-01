export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  "description"?: string,
  "url"?: string,
  "type"?: string
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  type: "youtube" | "article" | "wikipedia";
}

export interface HobbyAttributes {
  physicalActivityLevel: number; // Level of physical activity
  timeConsumption: number; // How time-consuming
  sociability: number; // Level of social interaction
  mobility: number; // How mobile you need to be
  competition: number; // Level of competition involved
  relaxationLevel: number; // How relaxing
  monetizationPotential: number; // Potential to earn money
  noiseLevel: number; // How noisy
  environmentalImpact: number; // Impact on environment
  mentalHealthImpact: number; // Impact on mental health
  physicalHealthImpact: number; // Impact on physical health
  artisticExpression: number; // Level of artistic expression
  initialCost: number; // Starting cost
  ongoingCost: number; // Maintenance cost
}

export interface HobbyDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  attributes: HobbyAttributes;
  tasks: Task[];
  sources: Source[];
  twitterHandle?: string;
}
