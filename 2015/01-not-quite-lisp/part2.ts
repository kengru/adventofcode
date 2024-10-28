import { readFileSync } from "node:fs";

const buffer = readFileSync("2015/01-not-quite-lisp/input.txt");
const str = buffer
  .toString()
  .split("")
  .reduce((prev, cur, idx) => {
    if (prev === -1) {
      console.log(idx);
    }
    return cur === "(" ? prev + 1 : prev - 1;
  }, 0);
