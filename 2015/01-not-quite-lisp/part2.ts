import { readFileSync } from "node:fs";
import { exit } from "node:process";

console.time("bench");

const buffer = readFileSync("2015/01-not-quite-lisp/input.txt");
buffer
  .toString()
  .split("")
  .reduce((prev, cur, idx) => {
    if (prev === -1) {
      console.timeEnd("bench");
      console.log(idx);
      exit();
    }
    return cur === "(" ? prev + 1 : prev - 1;
  }, 0);
