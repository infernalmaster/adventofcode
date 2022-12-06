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
  1: 3,
  2: 1,
  3: 2,
};

let score = 0;

file.split("\n").forEach((row) => {
  if (!row) return;

  const [a, _, b] = row.slice("\n");

  const enemy = MAP[a];
  const me = MAP[b];

  const myWin = WINS[me] === enemy;

  score += me;

  if (myWin) {
    score += 6;
  } else if (me === enemy) {
    score += 3;
  } else {
    score += 0;
  }
});

console.log(score);
