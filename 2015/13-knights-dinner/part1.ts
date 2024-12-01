import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/13-knights-dinner/input.txt");
const parsed = buffer.toString().split("\n");

console.timeEnd("bench");
