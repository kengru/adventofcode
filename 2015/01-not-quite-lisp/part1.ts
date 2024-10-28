import { readFileSync } from "node:fs";

const buffer = readFileSync("2015/01-not-quite-lisp/input.txt");
const answer = buffer
  .toString()
  .split("")
  .reduce((prev, cur) => (cur === "(" ? prev + 1 : prev - 1), 0);

console.log(answer);
