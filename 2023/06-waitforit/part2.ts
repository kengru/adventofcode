import { readFileSync } from "node:fs";

const buffer = readFileSync("src/06-waitforit/input.txt");
const [time, distance] = buffer.toString().split("\n");
const [_, times] = time.split(":");
const [__, distances] = distance.split(":");
const t = +times
  .split(" ")
  .filter((t) => t !== "")
  .join("");
const d = +distances
  .split(" ")
  .filter((t) => t !== "")
  .join("");

let counter = 0;
for (let hold = 1; hold < t; hold++) {
  let remainingRunningTime = t - hold;
  let distanceTraveled = remainingRunningTime * hold;
  if (distanceTraveled > d) {
    counter++;
  }
}

console.log(counter);
