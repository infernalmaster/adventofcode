import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

let i = 0;

const distinctLength = 14;

while (i < f.length) {
  const words: string[] = [];

  for (let j = 0; j < distinctLength; j++) {
    const char = f[i + j];

    const sameCharIndex = words.indexOf(char);

    if (sameCharIndex === -1) {
      words.push(char);
    } else {
      i += sameCharIndex;
      break;
    }
  }

  if (words.length === distinctLength) {
    break;
  }

  i++;
}

const answer = i + distinctLength;

console.log(answer);
