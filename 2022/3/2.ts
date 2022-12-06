import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const file = await Deno.readTextFile(path.join(__dirname, "input.txt"));

const alphabetLength = 26;

// a => 0
// b => 2
// ...
// A = 26
const getCharIndex = (char: string) => {
  const code = char.charCodeAt(0);

  return code >= "a".charCodeAt(0)
    ? code - "a".charCodeAt(0)
    : code - "A".charCodeAt(0) + alphabetLength;
};

const getNumber = (index: number) => {
  const bits = new Array(alphabetLength * 2).fill("0");

  bits[index] = "1";

  return BigInt("0b" + bits.join(""));
};

// String to binary number
// where char with index n is represented as bit 1 in position n
// "aaac" => 0b1010000000000...
const getRowNumber = (row: string) =>
  row.split("").reduce(
    (acc: bigint, char) => acc | getNumber(getCharIndex(char)),
    BigInt(0),
  );

const numberToScore = (intersection: bigint) => {
  const bits = intersection.toString(2).padStart(alphabetLength * 2, "0");

  return bits.split("").reduce((acc, char, index) => {
    if (char === "1") {
      return acc + index + 1;
    }

    return acc;
  }, 0);
};

const score = file.split("\n").reduce((acc, _row, index, arr) => {
  if (index % 3 === 2) {
    const intersection = getRowNumber(arr[index]) &
      getRowNumber(arr[index - 1]) & getRowNumber(arr[index - 2]);

    return acc + numberToScore(intersection);
  }

  return acc;
}, 0);

console.log(score);
