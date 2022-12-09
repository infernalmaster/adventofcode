import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

class Knot {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  addTo(v2: Knot) {
    this.x += v2.x;
    this.y += v2.y;
  }

  subtract(v2: Knot): Knot {
    return new Knot(this.x - v2.x, this.y - v2.y);
  }

  followTo(head: Knot) {
    const tailDirection = head.subtract(this);
    if (Math.abs(tailDirection.x) > 1 || Math.abs(tailDirection.y) > 1) {
      if (tailDirection.x !== 0) {
        tailDirection.x = tailDirection.x / Math.abs(tailDirection.x);
      }
      if (tailDirection.y !== 0) {
        tailDirection.y = tailDirection.y / Math.abs(tailDirection.y);
      }

      this.addTo(tailDirection);
    }
  }
}

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const directions = {
  U: new Knot(0, 1),
  D: new Knot(0, -1),
  L: new Knot(-1, 0),
  R: new Knot(1, 0),
};

const head = new Knot(0, 0);
const tail = new Knot(0, 0);

const visited: Map<number, Set<number>> = new Map();
const registerPosition = (tail: Knot) => {
  if (!visited.has(tail.x)) {
    visited.set(tail.x, new Set());
  }
  visited.get(tail.x)?.add(tail.y);
};
registerPosition(tail);

f.slice(0, -1).split("\n").forEach((row) => {
  const els = row.split(" ");
  const direction = directions[els[0] as keyof typeof directions];
  const steps = Number(els[1]);

  for (let i = 0; i < steps; i++) {
    head.addTo(direction);
    tail.followTo(head);

    registerPosition(tail);
  }
});

const answer = Array.from(visited.values()).reduce(
  (acc, set) => acc + set.size,
  0,
);
console.log("answer=", answer);
