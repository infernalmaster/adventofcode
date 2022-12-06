import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const file = await Deno.readTextFile(path.join(__dirname, "input.txt"));

// rock
// paper
// scissors
const MAP = {
  A: 1,
  B: 2,
  C: 3,

  X: 1,
  Y: 2,
  Z: 3,
};

const WINS = {
  1: 2,
  2: 3,
  3: 1,
};

const LOOSE = {
  1: 3,
  2: 1,
  3: 2,
};

let score = 0;

file.split("\n").forEach((row) => {
  if (!row) return;

  const [a, _, b] = row.slice("\n");

  const enemy = MAP[a];

  if (b === "Z") {
    score += 6 + WINS[enemy];
  } else if (b === "Y") {
    score += 3 + enemy;
  } else { // X
    score += 0 + LOOSE[enemy];
  }
});

console.log(score);
