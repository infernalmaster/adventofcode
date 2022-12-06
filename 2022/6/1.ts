import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

let i = 0;

const uniqSize = 4;

while (i < f.length) {
  const words: Map<string, number> = new Map();

  for (let j = 0; j < uniqSize; j++) {
    const char = f[i + j];

    if (words.has(char)) {
      i += words.get(char) as number;
      break;
    } else {
      words.set(char, j);
    }
  }

  if (words.size === uniqSize) {
    break;
  }

  i++;
}

const answer = i + uniqSize;

console.log(answer);
