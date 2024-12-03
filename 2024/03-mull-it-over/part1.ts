import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/03-mull-it-over/input.txt");
const parsed = buffer.toString();
let total = 0;

const inst = parsed.match(/mul\(\d{1,3},\d{1,3}\)/g);
if (inst) {
  inst.forEach((v) => {
    v = v.replace("mul(", "");
    v = v.replace(")", "");
    const [n1, n2] = v.split(",");
    total += +n1 * +n2;
  });
}

console.timeEnd("bench");

console.log(total);
