import { readFileSync } from "node:fs";

const buffer = readFileSync("2015/02-no-math/input.txt");
const presents = buffer.toString().split("\n");

const total = presents.reduce((prev, cur) => {
  const dims = cur.split("x").map((d) => +d);
  const v1 = dims[0] * dims[1];
  const v2 = dims[0] * dims[2];
  const v3 = dims[1] * dims[2];
  const sfa = 2 * v1 + 2 * v2 + 2 * v3;
  return prev + sfa + Math.min(...[v1, v2, v3]);
}, 0);

console.log(total);
