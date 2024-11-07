import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2016/03-squares-three/input.txt");
const triangles = buffer.toString().split("\n");
let sum = 0;
const ts: number[] = [];

function getNumbers(val: string): number[] {
  return val
    .split("  ")
    .map((n) => +n.trim())
    .filter((v) => v !== 0);
}

function checkWithIdx(idxs: number[]): number {
  const all = [ts[idxs[0]], ts[idxs[1]], ts[idxs[2]]];
  for (let i = 0; i < idxs.length; i++) {
    let p1 = all[i];
    let p2 = i + 1 > idxs.length - 1 ? all[0] : all[i + 1];
    let remaining = all.filter((v) => v != p1 && v != p2)[0];
    if (p1 + p2 <= remaining) {
      return 0;
    }
  }
  return 1;
}

for (let i = 0; i < triangles.length; i++) {
  const [t1, t2, t3] = getNumbers(triangles[i]);
  ts.push(t1, t2, t3);
  if (ts.length === 9) {
    const c1 = checkWithIdx([0, 3, 6]);
    const c2 = checkWithIdx([1, 4, 7]);
    const c3 = checkWithIdx([2, 5, 8]);
    sum += c1 + c2 + c3;
    ts.length = 0;
  }
}

console.timeEnd("bench");

console.log(sum);
