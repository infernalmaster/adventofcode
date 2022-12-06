import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const file = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const isOneRangeFullyContainsOther = (row: string) => {
  const [a, b, x, y] = row.split(/-|,/).map(Number);

  return (a <= x && y <= b) || (x <= a && b <= y);
};

const answer = file.split("\n").reduce((acc, row) => {
  if (!!row && isOneRangeFullyContainsOther(row)) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(answer);
