import { parse } from "csv-parse/sync";
import fs from "fs";
import { HobbyAttributes, HobbyDetail, Source, Task } from "./types/hobby";

interface CSVHobbyRow {
  Hobby: string;
  Category: string;
  Description: string;
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

const createHobbyId = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/g, "_") // Allow Polish characters
    .replace(/(^_|_$)/g, "");
};

// Read and parse CSV files
const hobbiesData = parse(fs.readFileSync("hobbies.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
  encoding: "utf8",
}) as CSVHobbyRow[];

const tasksData = parse(fs.readFileSync("tasks.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
  encoding: "utf8",
}) as CSVTaskRow[];

const sourcesData = parse(fs.readFileSync("sources.csv", "utf8"), {
  columns: true,
  skip_empty_lines: true,
  encoding: "utf8",
}) as CSVSourceRow[];

// Create the hobby details object
const hobbyDetails: Record<string, HobbyDetail> = {};

// Process each hobby
hobbiesData.forEach((row) => {
  const hobbyId = createHobbyId(row.Hobby);
  const description = createHobbyId(row.Description);

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

  console.log(createHobbyId(row.Category));

  // Create the hobby detail object
  hobbyDetails[hobbyId] = {
    id: hobbyId,
    name: row.Hobby,
    category: createHobbyId(row.Category),
    description,
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
  { encoding: "utf8" }
);

console.log("Conversion completed successfully!");
