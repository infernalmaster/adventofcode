import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const file = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const [cargo, operations] = file.split("\n\n");

const towers: Map<number, string[]> = new Map();

const [head, ...tail] = cargo.split("\n").reverse();

const maxIndex = Number(head.split(" ").reverse().filter(Boolean)[0]);

tail.forEach((row) => {
  for (let i = 1; i <= maxIndex; i++) {
    if (!towers.has(i)) {
      towers.set(i, []);
    }

    const letter: string = row[1 + (i - 1) * 4];
    if (letter !== " ") {
      towers.get(i)?.push(letter);
    }
  }
});

operations.split("\n").forEach((row) => {
  if (!row) return;

  const [_tmp1, quantity, _tmp2, from, _tmp3, to] = row.split(" ").map(Number);

  const fromTower = towers.get(from);
  if (fromTower) {
    const moved: string[] = fromTower.splice(-quantity);
    towers.get(to)?.push(...moved);
  }
});

let answer = "";

for (let i = 1; i <= maxIndex; i++) {
  answer = answer + towers.get(i)?.pop();
}

console.log(answer);
