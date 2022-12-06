import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

let i = 0;

const distinctLength = 14;

while (i < f.length) {
  if (
    new Set(f.slice(i, i + distinctLength).split("")).size === distinctLength
  ) {
    break;
  }

  i++;
}

const answer = i + distinctLength;

console.log(answer);
