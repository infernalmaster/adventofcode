import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const monkeys = f.split("\n\n").map((monkey, index) => {
  const rows = monkey.split("\n");
  return {
    name: index,
    items: rows[1].split(": ")[1].split(", ").map(Number),
    operation: Function("old", `return ${rows[2].split("= ")[1]};`),
    test: Number(rows[3].split(" by")[1]),
    trueMonkey: Number(rows[4].split("monkey ")[1]),
    falseMonkey: Number(rows[5].split("monkey ")[1]),
    inspections: 0,
  };
});

const round = () =>
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      const itemAfter = Math.floor(monkey.operation(item) / 3);
      monkeys[
        itemAfter % monkey.test === 0 ? monkey.trueMonkey : monkey.falseMonkey
      ].items.push(itemAfter);
    });

    monkey.inspections += monkey.items.length;
    monkey.items = [];
  });

for (let i = 0; i < 20; i++) {
  round();
}

monkeys.sort((a, b) => b.inspections > a.inspections ? 1 : -1);

console.log(monkeys[0].inspections * monkeys[1].inspections);

// 62491
