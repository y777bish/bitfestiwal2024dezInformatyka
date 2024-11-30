export function parseCSV(data: string): {
  features: number[][];
  targets: string[];
  headers: string[];
} {
  // THIS PROBABLY DOES NOT WORK AFTER ADDING CATEGORY!!
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
