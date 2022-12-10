import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

let cycle = 1;
let value = 1;
let strength = 0;

const nextCycle = () => {
  if ((cycle - 20) % 40 === 0) {
    strength += cycle * value;
  }
  cycle++;
};

f.slice(0, -1).split("\n").forEach((row) => {
  if (row === "noop") {
    nextCycle();
  } else {
    nextCycle();
    nextCycle();

    const adder = Number(row.split(" ")[1]);
    value += adder;
  }
});

console.log(strength);
