import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const pathes = f.slice(0, -1).split("\n").map((row) =>
  row.split(" -> ").map(
    (pair) => pair.split(",").map(Number),
  )
);

let minX = Infinity;
let maxX = 0;
let minY = 0;
let maxY = 0;

pathes.forEach((path) =>
  path.forEach(([x, y]) => {
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    // if (y < minY) minY = y;
  })
);

console.log(minX, maxX, minY, maxY);

const width = maxX - minX + 1;
const height = maxY - minY + 1;

console.log(width, height);

let grid = new Array(height).fill(null).map(() => new Array(width).fill("."));

const drawLine = (grid, p1, p2) => {
  if (p1[0] === p2[0]) {
    const [a, b] = p1[1] < p2[1] ? [p1, p2] : [p2, p1];
    for (let i = a[1]; i <= b[1]; i++) {
      grid[i - minY][a[0] - minX] = "█";
    }
  }

  if (p1[1] === p2[1]) {
    const [a, b] = p1[0] < p2[0] ? [p1, p2] : [p2, p1];
    for (let i = a[0]; i <= b[0]; i++) {
      grid[a[1] - minY][i - minX] = "█";
    }
  }
};

const drawGrid = (grid) => {
  console.log("");
  grid.forEach((row) => console.log(row.join("")));
};

pathes.forEach((path) =>
  path.forEach((point, index) => {
    if (index > 0) {
      drawLine(grid, path[index - 1], point);
    }
  })
);
drawGrid(grid);

let sand = [500 - minX, 0];
let dropped = 0;

while (sand[0] >= 0 && sand[0] <= width && sand[1] >= minY && sand[1] < maxY) {
  if (grid[sand[1] + 1][sand[0]] === ".") {
    sand[1] += 1;
  } else if (grid[sand[1] + 1][sand[0] - 1] === ".") {
    sand[0] -= 1;
    sand[1] += 1;
  } else if (grid[sand[1] + 1][sand[0] + 1] === ".") {
    sand[0] += 1;
    sand[1] += 1;
  } else {
    grid[sand[1]][sand[0]] = "o";
    sand = [500 - minX, 0];
    dropped += 1;
    drawGrid(grid);
  }
}

console.log(dropped);
