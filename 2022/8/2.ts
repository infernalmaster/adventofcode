import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

interface Tree {
  height: number;
  visible: boolean;
}

const forest: Tree[][] = f.slice(0, -1).split("\n").map((row) =>
  row.split("").map((height) => ({
    height: Number(height),
    visible: false,
  }))
);

let max = 0;

forest.forEach((row, y) =>
  row.forEach((tree, x) => {
    let xa = 0;
    for (let p = x + 1; p < forest[0].length; p++) {
      xa++;
      if (forest[y][p].height >= tree.height) {
        break;
      }
    }

    let xb = 0;
    for (let p = x - 1; p >= 0; p--) {
      xb++;
      if (forest[y][p].height >= tree.height) {
        break;
      }
    }

    let ya = 0;
    for (let p = y + 1; p < forest.length; p++) {
      ya++;
      if (forest[p][x].height >= tree.height) {
        break;
      }
    }

    let yb = 0;
    for (let p = y - 1; p >= 0; p--) {
      yb++;
      if (forest[p][x].height >= tree.height) {
        break;
      }
    }

    const currentMax = xa * xb * ya * yb;

    if (currentMax > max) {
      max = currentMax;
    }
  })
);

console.log(max);
