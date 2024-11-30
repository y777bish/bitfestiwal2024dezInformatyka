import { parse } from "csv-parse/sync";
import fs from "fs";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  type: "youtube" | "article" | "wikipedia";
}

interface HobbyAttributes {
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
  imageUrl: string;
  attributes: HobbyAttributes;
  tasks: Task[];
  sources: Source[];
}

interface CSVHobbyRow {
  Hobby: string;
  "Physical Activity Level": string;
  "Time Consumption": string;
  Sociability: string;
  Mobility: string;
  Competition: string;
  "Relaxation Level": string;
  "Monetization Potential": string;
  "Noise Level": string;
  "Environmental Impact": string;
  "Mental Health Impact": string;
  "Physical Health Impact": string;
  "Artistic Expression": string;
  "Initial Cost": string;
  "Ongoing Cost": string;
}

interface CSVTaskRow {
  Hobby: string;
  "Source ID": string;
  Title: string;
  IsCompleted: string;
}

interface CSVSourceRow {
  Hobby: string;
  "Source ID": string;
  Name: string;
  Description: string;
  URL: string;
  Type: "youtube" | "article" | "wikipedia";
}

// Function to create consistent hobby IDs
const createHobbyId = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/(^_|_$)/g, "");
};

// Read and parse CSV files
const hobbiesData = parse(fs.readFileSync("hobbies.csv", "utf-8"), {
  columns: true,
  skip_empty_lines: true,
}) as CSVHobbyRow[];

const tasksData = parse(fs.readFileSync("tasks.csv", "utf-8"), {
  columns: true,
  skip_empty_lines: true,
}) as CSVTaskRow[];

const sourcesData = parse(fs.readFileSync("sources.csv", "utf-8"), {
  columns: true,
  skip_empty_lines: true,
}) as CSVSourceRow[];

// Create the hobby details object
const hobbyDetails: Record<string, HobbyDetail> = {};

// Process each hobby
hobbiesData.forEach((row) => {
  const hobbyId = createHobbyId(row.Hobby);

  // Create attributes object
  const attributes: HobbyAttributes = {
    physicalActivityLevel: parseInt(row["Physical Activity Level"]),
    timeConsumption: parseInt(row["Time Consumption"]),
    sociability: parseInt(row.Sociability),
    mobility: parseInt(row.Mobility),
    competition: parseInt(row.Competition),
    relaxationLevel: parseInt(row["Relaxation Level"]),
    monetizationPotential: parseInt(row["Monetization Potential"]),
    noiseLevel: parseInt(row["Noise Level"]),
    environmentalImpact: parseInt(row["Environmental Impact"]),
    mentalHealthImpact: parseInt(row["Mental Health Impact"]),
    physicalHealthImpact: parseInt(row["Physical Health Impact"]),
    artisticExpression: parseInt(row["Artistic Expression"]),
    initialCost: parseInt(row["Initial Cost"]),
    ongoingCost: parseInt(row["Ongoing Cost"]),
  };

  // Get tasks for this hobby
  const tasks: Task[] = tasksData
    .filter((task) => createHobbyId(task.Hobby) === hobbyId)
    .map((task) => ({
      id: task["Source ID"],
      title: task.Title,
      isCompleted: task.IsCompleted.toLowerCase() === "true",
    }));

  // Get sources for this hobby
  const sources: Source[] = sourcesData
    .filter((source) => createHobbyId(source.Hobby) === hobbyId)
    .map((source) => ({
      id: source["Source ID"],
      name: source.Name,
      description: source.Description,
      url: source.URL,
      type: source.Type,
    }));

  // Create the hobby detail object
  hobbyDetails[hobbyId] = {
    id: hobbyId,
    name: row.Hobby,
    description: `${row.Hobby} to fascynujące hobby, które pozwala...`, // Placeholder description
    imageUrl: `/api/placeholder/800/400`,
    attributes,
    tasks,
    sources,
  };
});

// Write the result to a file
fs.writeFileSync(
  "data/hobbies.ts",
  `import { HobbyDetail } from '../types/hobby';\n\n` +
    `export const hobbiesData: Record<string, HobbyDetail> = ` +
    JSON.stringify(hobbyDetails, null, 2) +
    `;\n`,
);

console.log("Conversion completed successfully!");
