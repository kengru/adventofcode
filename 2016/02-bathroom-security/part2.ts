import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2016/02-bathroom-security/input.txt");
const codes = buffer.toString().split("\n");
const pad = [
  [0, 0, 1, 0, 0],
  [0, 2, 3, 4, 0],
  [5, 6, 7, 8, 9],
  [0, "A", "B", "C", 0],
  [0, 0, "D", 0, 0],
];
let cursor = [2, 0];

const bathroomCode = codes.reduce((prev, cur) => {
  const inst = cur.split("");
  inst.forEach((i) => {
    switch (i) {
      case "L":
        const lChange = Math.max(cursor[1] - 1, 0);
        if (pad[cursor[0]][lChange]) {
          cursor[1] = lChange;
        }
        break;
      case "R":
        const rChange = Math.min(cursor[1] + 1, pad[cursor[0]].length);
        if (pad[cursor[0]][rChange]) {
          cursor[1] = rChange;
        }
        break;
      case "U":
        const uChange = Math.max(cursor[0] - 1, 0);
        if (pad[uChange][cursor[1]]) {
          cursor[0] = uChange;
        }
        break;
      case "D":
        const dChange = Math.min(cursor[0] + 1, pad.length);
        if (pad[dChange] && pad[dChange][cursor[1]]) {
          cursor[0] = dChange;
        }
        break;
      default:
        break;
    }
  });
  return prev + pad[cursor[0]][cursor[1]];
}, "");

console.timeEnd("bench");

console.log(bathroomCode);
