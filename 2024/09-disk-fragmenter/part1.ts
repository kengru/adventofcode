import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/09-disk-fragmenter/test-input.txt");
const parsed = buffer.toString();

console.timeEnd("bench");
