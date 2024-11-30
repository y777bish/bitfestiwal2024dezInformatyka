import { hobbiesData } from "@/data/hobbies";
import { KNN } from "./knn";

const rows = Object.keys(hobbiesData);

const features = rows.map((row) => {
  return Object.values(hobbiesData[row].attributes);
});

const targets = Object.keys(hobbiesData);

console.log({ rows, features, targets });

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

  return neighbors;
};
