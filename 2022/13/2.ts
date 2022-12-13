import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const comparator = (
  x: number | number[],
  y: number | number[],
): number => {
  if (typeof x === "number" && typeof y === "number") {
    return x - y;
  }

  if (typeof x === "number") {
    return comparator([x], y);
  }

  if (typeof y === "number") {
    return comparator(x, [y]);
  }

  for (let i = 0; i < Math.min(x.length, y.length); i++) {
    const order = comparator(x[i], y[i]);

    if (order === 0) {
      continue;
    }

    return order;
  }

  if (x.length === y.length) {
    return 0;
  }

  return x.length - y.length;
};

const arr = f.slice(0, -1).split("\n\n").reduce((acc, pair) => {
  const [a, b] = pair.split("\n").map(JSON.parse);

  acc.push(a, b);
  return acc;
}, []);

arr.push([[2]], [[6]]);

arr.sort(comparator);

let answer = 1;

arr.forEach((item, index) => {
  const str = JSON.stringify(item);
  if (str === "[[2]]" || str === "[[6]]") {
    answer *= index + 1;
  }
});

console.log(answer);
