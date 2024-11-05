import { createHash } from "crypto";

console.time("bench");

const input = "iwrupvqb";
let pnum = 0;
let stop = false;

function md5(value: string) {
  return createHash("md5").update(value).digest("hex");
}

function hasLeadingZeroes(val: string): boolean {
  return val.startsWith("000000");
}

while (!stop) {
  const hash = md5(`${input}${pnum}`);
  stop = hasLeadingZeroes(hash);
  pnum++;
}

console.timeEnd("bench");

console.log(pnum - 1);
