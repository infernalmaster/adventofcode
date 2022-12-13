import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const isRightOrder = (
  x: number | number[],
  y: number | number[],
): boolean | null => {
  if (typeof x === "number" && typeof y === "number") {
    return x === y ? null : x < y;
  }

  if (typeof x === "number") {
    return isRightOrder([x], y);
  }

  if (typeof y === "number") {
    return isRightOrder(x, [y]);
  }

  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    const order = isRightOrder(x[i], y[i]);

    if (order === null) {
      continue;
    }

    return order;
  }

  if (x.length === y.length) {
    return null;
  }

  return x.length < y.length;
};

let answer = 0;

f.slice(0, -1).split("\n\n").forEach((pair, index) => {
  const [a, b] = pair.split("\n").map(JSON.parse);

  if (isRightOrder(a, b)) {
    answer += index + 1;
  }
});

console.log("answer", answer);
