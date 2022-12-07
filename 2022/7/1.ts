import * as path from "https://deno.land/std@0.57.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const f = await Deno.readTextFile(path.join(__dirname, "input.txt"));

let tree = {
  children: {},
};

const currentPath: string[] = [];
let currentNode = null;

f.split("\n").forEach((row) => {
  if (!row) return;
  const [a, b, c] = row.split(" ");

  if (a === "$") {
    if (b === "cd") {
      if (c === "..") {
        currentPath.pop();
      } else {
        currentPath.push(c);
      }
    } else if (b === "ls") {
      currentNode = tree;
      currentPath.forEach((p) => {
        if (!currentNode.children[p]) {
          currentNode.children[p] = {
            name: p,
            children: {},
          };
        }

        currentNode = currentNode.children[p];
      });
    }
  } else {
    if (a === "dir") {
      currentNode.children[b] = {
        name: b,
        children: {},
      };
    } else {
      currentNode.children[b] = {
        name: b,
        size: Number(a),
      };
    }
  }
});

let sum = 0;

const calcSize = (node) => {
  if (node.size === undefined) {
    const size = Object.values(node.children).reduce((acc, child) => {
      return acc + calcSize(child);
    }, 0);

    node.size = size;
  }

  if (node.children && node.size <= 100000) {
    sum += node.size;
  }

  return node.size;
};

calcSize(tree.children["/"]);

console.log(sum);
