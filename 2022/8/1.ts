import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

interface Tree {
  height: number;
  visible: boolean;
}

const forest: Tree[][] = f.slice(0, -1).split("\n").map((row, y, rows) =>
  row.split("").map((height, x, columns) => ({
    height: Number(height),
    visible: x === 0 || x === columns.length - 1 ||
      y === 0 || y === rows.length - 1,
  }))
);

const height = forest.length;
const width = forest[0].length;

for (let x = 1; x < width - 1; x++) {
  // trace ray top-bot
  let y = 1;
  let max = forest[y - 1][x].height;
  for (; y < height - 1; y++) {
    const tree = forest[y][x];

    if (tree.height > max) {
      max = tree.height;
      tree.visible = true;
    }
  }

  // trace ray bot-top
  y = height - 2;
  max = forest[y + 1][x].height;
  for (; y > 0; y--) {
    const tree = forest[y][x];

    if (tree.height > max) {
      max = tree.height;
      tree.visible = true;
    }
  }
}

for (let y = 1; y < height - 1; y++) {
  // trace ray left-right
  let x = 1;
  let max = forest[y][x - 1].height;

  for (; x < width - 1; x++) {
    const tree = forest[y][x];

    if (tree.height > max) {
      max = tree.height;
      tree.visible = true;
    }
  }

  // trace ray right-left
  x = width - 2;
  max = forest[y][x + 1].height;
  for (; x > 0; x--) {
    const tree = forest[y][x];

    if (tree.height > max) {
      max = tree.height;
      tree.visible = true;
    }
  }
}

let sum = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (forest[y][x].visible) {
      sum++;
    }
  }
}

// console.log(forest.map((r) => r.map((c) => c.height).join("")).join("\n"));
// console.log(" ");
// console.log(
//   forest.map((r) => r.map((c) => c.visible ? 1 : 0).join("")).join("\n"),
// );
console.log(sum);
