import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2016/02-bathroom-security/input.txt");
const codes = buffer.toString().split("\n");
const pad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
let cursor = [1, 1];

const bathroomCode = codes.reduce((prev, cur) => {
  const inst = cur.split("");
  inst.forEach((i) => {
    switch (i) {
      case "L":
        cursor[1] = Math.max(cursor[1] - 1, 0);
        break;
      case "R":
        cursor[1] = Math.min(cursor[1] + 1, 2);
        break;
      case "U":
        cursor[0] = Math.max(cursor[0] - 1, 0);
        break;
      case "D":
        cursor[0] = Math.min(cursor[0] + 1, 2);
        break;
      default:
        break;
    }
  });
  return prev + pad[cursor[0]][cursor[1]].toString();
}, "");

console.timeEnd("bench");

console.log(bathroomCode);
