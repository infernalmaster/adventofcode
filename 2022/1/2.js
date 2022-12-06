import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const file = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const elfs = file.split("\n\n");

let max = [0, 0, 0];

const sum = (acc, current) => acc + current;

elfs.forEach((elf) => {
  const elfCalories = elf.split("\n").map(Number).reduce(sum, 0);
  max.push(elfCalories);
  max.sort((a, b) => b - a);
  max = max.slice(0, 3);
});

console.log(max.reduce(sum, 0));
