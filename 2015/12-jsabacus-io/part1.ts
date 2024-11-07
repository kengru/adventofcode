import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/12-jsabacus-io/input.txt");
const parsed = JSON.parse(buffer.toString());

// function flatten(v: any): number[] {
//   const n = [];
//   if (v) {
//     return n
//   }
//   return n;
// }

console.timeEnd("bench");

console.log(parsed);
