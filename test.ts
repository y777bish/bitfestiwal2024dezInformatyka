type DistanceMetric = "euclidean";
type Result = {
  distance: number;
  label: string;
};

function columnAverages(matrix: number[][]) {
  // Get the number of rows and columns
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Initialize an array to store column averages
  const averages = new Array(numCols).fill(0);

  // Sum each column
  for (let col = 0; col < numCols; col++) {
    let sum = 0;
    for (let row = 0; row < numRows; row++) {
      sum += matrix[row][col];
    }
    // Compute the average for this column
    averages[col] = sum / numRows;
  }

  return averages;
}

class KNN {
  private trainFeatures: number[][] = [];
  private trainLabels: string[] = [];
  private k: number;
  private distanceMetric: DistanceMetric;
  private trainAverageFeatures: number[] = [];

  constructor(k: number = 3, distanceMetric: DistanceMetric = "euclidean") {
    if (k < 1) {
      throw new Error("Parametr k musi być większy lub równy 1.");
    }
    this.k = k;
    this.distanceMetric = distanceMetric;
  }

  /**
   * Trenuje model na podstawie danych wejściowych
   * @param features - Dane wejściowe (macierz cech)
   * @param labels - Wartości docelowe (wektor etykiet lub wartości ciągłych)
   */
  train(features: number[][], labels: string[]): void {
    this.trainAverageFeatures = columnAverages(features);
    this.trainFeatures = features;
    this.trainLabels = labels;
  }


  eliminateVisual(target: number[]): string[] {
    const displayedTargets = []
    for (let i = 0; i < this.trainFeatures.length; i++) {
        if (target.every((targetValue, idx) => Math.abs(targetValue - features[i][idx]) >= 1)) {
            displayedTargets.push(this.trainLabels[i])
        }
    };
    return displayedTargets;
}

  /**
   * Dokonuje predykcji dla pojedynczego przykładu
   * @param sample - Pojedynczy przykład wejściowy
   * @returns Obiekt zawierający przewidywaną wartość oraz najbliższych sąsiadów
   */
  predict(sample: number[]): Result[] {
    const distances = this.trainFeatures.map((trainSample, index) => ({
      distance: this.calculateDistance(
        sample,
        trainSample.slice(0, sample.length),
      ),
      label: this.trainLabels[index],
    }));

    // Posortuj sąsiadów według odległości
    distances.sort((a, b) => a.distance - b.distance);

    // Wybierz k najbliższych sąsiadów
    const nearestNeighbors = distances.slice(0, this.k) as Result[];

    return nearestNeighbors;
  }

  /**
   * Oblicza odległość między dwoma punktami
   * @param a - Pierwszy punkt
   * @param b - Drugi punkt
   * @returns Odległość między punktami
   */
  private calculateDistance(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error("Wektory a i b muszą mieć tę samą długość.");
    }

    if (this.distanceMetric === "euclidean") {
      return Math.sqrt(a.reduce((sum, ai, i) => sum + (ai - b[i]) ** 2, 0));
    } else if (this.distanceMetric === "manhattan") {
      return a.reduce((sum, ai, i) => sum + Math.abs(ai - b[i]), 0);
    } else {
      throw new Error(`Nieznana metryka odległości: ${this.distanceMetric}`);
    }
  }
}

import { readFile } from "fs/promises";

const csvData = await readFile("src/hobbies.csv", "utf-8");

function parseCSV(data: string): {
  features: number[][];
  targets: string[];
  headers: string[];
} {
  const rows = data.trim().split("\n");
  const headers = rows[0].split(",").slice(1);
  const dataRows = rows.slice(1);
  const features: number[][] = [];
  const targets: string[] = [];

  for (const row of dataRows) {
    const [l, ...f] = row.split(",");
    features.push(f.map(Number));
    targets.push(l);
  }

  return { features, targets, headers };
}

const { features, targets, headers } = parseCSV(csvData);

const NEAREST_NEIGHBOR = 5;
// Użycie klasy KNN
const knn = new KNN(NEAREST_NEIGHBOR); // Ustawienie liczby sąsiadów na 3
knn.train(features, targets);

export const getKnn = () => knn;

if (import.meta.main) {
  // this is the main module
  const g = [];
  for (let i = 0; i < features[0].length; i++) {
    const v = prompt(`${headers[i]}:`);
    g.push(Number(v));
    const neighbors = knn.predict(g);
    const left = knn.eliminateVisual(g);
    console.log({ neighbors });
    console.log(left.length);
  }
} else {
  // we were require()d from somewhere else
}
