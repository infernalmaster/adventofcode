import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

interface Cell {
  height: number;
  steps: number;
}

let start: number[];
let end: number[];

const grid: Cell[][] = f.slice(0, -1).split("\n").map((row: string, y) => {
  return row.split("").map((char: string, x) => {
    if (char === "S") {
      start = [x, y];
      return {
        height: 0,
        steps: Infinity,
      };
    } else if (char === "E") {
      end = [x, y];
      return {
        height: "z".charCodeAt(0) - "a".charCodeAt(0),
        steps: Infinity,
      };
    }

    return {
      height: char.charCodeAt(0) - "a".charCodeAt(0),
      steps: Infinity,
    };
  });
});

let min = Infinity;

const go = (x: number, y: number, step = 0, prevHeight = 0) => {
  const cell = grid[y][x];

  if (cell.height >= prevHeight - 1 && cell.steps > step) {
    cell.steps = step;

    if (cell.height === 0) {
      if (cell.steps < min) {
        min = cell.steps;
      }

      return;
    }
  } else {
    return;
  }

  if (x > 0) {
    go(x - 1, y, step + 1, cell.height);
  }

  if (x <= grid[0].length - 2) {
    go(x + 1, y, step + 1, cell.height);
  }

  if (y > 0) {
    go(x, y - 1, step + 1, cell.height);
  }

  if (y <= grid.length - 2) {
    go(x, y + 1, step + 1, cell.height);
  }
};

go(end[0], end[1], 0, 26);

console.log("min", min);

// console.log(grid[end[1]][end[0]].steps);
