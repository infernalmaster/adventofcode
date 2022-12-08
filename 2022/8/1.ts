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

const populateVisibility = (tree: Tree, max: number): number => {
  if (tree.height > max) {
    max = tree.height;
    tree.visible = true;
  }
  return max;
};

for (let x = 0; x < forest[0].length; x++) {
  // trace ray top-bot
  forest.reduce((max, row) => populateVisibility(row[x], max), -1);

  // trace ray bot-top
  forest
    .slice().reverse()
    .reduce((max, row) => populateVisibility(row[x], max), -1);
}

for (let y = 0; y < forest.length; y++) {
  // trace ray left-right
  forest[y].reduce((max, tree) => populateVisibility(tree, max), -1);

  // trace ray right-left
  forest[y]
    .slice().reverse()
    .reduce((max, tree) => populateVisibility(tree, max), -1);
}

let sum = 0;
for (let y = 0; y < forest.length; y++) {
  for (let x = 0; x < forest[0].length; x++) {
    if (forest[y][x].visible) {
      sum++;
    }
  }
}

console.log(sum);
