import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/07-bridge-repair/input.txt");
const equations = buffer.toString().split("\n");
let perms: string[][] = [];
const operators = ["+", "*", "||"];

function permutator(arr: string[], n: number) {
  if (arr.length > n) {
    perms.push(arr);
    return;
  }
  for (let i = 0; i < operators.length; i++) {
    permutator(arr.concat([operators[i]]), n);
  }
}

const total = equations.reduce((prev, cur) => {
  const [calibration, nums] = cur.split(": ");
  const c = +calibration;
  const ns = nums.split(" ").map(Number);
  permutator([], ns.length - 2);
  let goes = false;
  for (let i = 0; i < perms.length; i++) {
    let idx = 0;
    let t = ns[idx];
    for (let j = 0; j < perms[i].length; j++) {
      switch (perms[i][j]) {
        case "+":
          t += ns[idx + 1];
          break;
        case "*":
          t *= ns[idx + 1];
          break;
        case "||":
          t = +t.toString().concat(ns[idx + 1].toString());
          break;
      }
      idx += 1;
    }
    if (t === c) {
      goes = true;
    }
  }
  perms = [];
  return goes ? prev + c : prev;
}, 0);

console.log(total);

console.timeEnd("bench");
