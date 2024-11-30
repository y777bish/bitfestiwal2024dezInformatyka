import { readFile } from "fs/promises";
import { KNN } from "./knn";
import { parseCSV } from "./parse-csv";

const csvData = await readFile("../hobbies.csv", "utf-8");
const { features, targets, headers } = parseCSV(csvData);
const NEAREST_NEIGHBOR = 5;
const knn = new KNN(NEAREST_NEIGHBOR); // Ustawienie liczby sąsiadów na 3
knn.train(features, targets);

// g = [] - array of indices of answers

// predict is run at the end
export const predictHobby = async (g: number[]) => {
  const neighbors = knn.predict(g);
  const left = knn.elliminateVisual(g);
  console.log({ neighbors });
  console.log(left.length);
};
