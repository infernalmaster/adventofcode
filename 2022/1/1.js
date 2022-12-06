import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const file = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const elfs = file.split("\n\n");

let max = 0;

elfs.forEach((elf) => {
  const elfCalories = elf.split("\n").map(Number).reduce(
    (acc, current) => acc + current,
    0,
  );

  if (elfCalories > max) {
    max = elfCalories;
  }
});

console.log(max);
