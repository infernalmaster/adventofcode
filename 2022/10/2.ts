import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

let cycle = 1;
let value = 1;
let row = "";

const nextCycle = () => {
  const pixel = (cycle - 1) % 40;

  if (pixel === value || pixel === value - 1 || pixel === value + 1) {
    row += "#";
  } else {
    row += "█";
  }

  if (pixel === 39) {
    console.log(row);
    row = "";
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
