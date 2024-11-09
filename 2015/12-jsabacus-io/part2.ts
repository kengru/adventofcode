import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/12-jsabacus-io/input.txt");
const parsed = JSON.parse(buffer.toString());

function flatArray(arr: any[]): number[] {
  const res: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const nums = flatArray(arr[i]);
      res.push(...nums);
      continue;
    }
    if (typeof arr[i] === "object") {
      const nums = flatObject(arr[i]);
      res.push(...nums);
      continue;
    }
    if (typeof arr[i] === "string") {
      continue;
    }
    res.push(arr[i]);
  }
  return res;
}

function flatObject(obj: any): number[] {
  const ar: number[] = [];
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  if (values.includes("red")) {
    return [];
  }
  keys.forEach((k) => {
    if (Array.isArray(obj[k])) {
      const nums = flatArray(obj[k]);
      ar.push(...nums);
      return;
    }
    if (typeof obj[k] === "object") {
      const nums = flatObject(obj[k]);
      ar.push(...nums);
      return;
    }
    if (typeof obj[k] === "string") {
      return;
    }
    ar.push(obj[k]);
  });

  return ar;
}

const sum = flatArray(parsed).reduce((prev, cur) => prev + cur, 0);

console.timeEnd("bench");

console.log(sum);
