import { readFileSync } from "node:fs";

const buffer = readFileSync("2023/06-waitforit/input.txt");
const [time, distance] = buffer.toString().split("\n");
const [_, times] = time.split(":");
const [__, distances] = distance.split(":");
const cleanedT = times
  .split(" ")
  .filter((t) => t !== "")
  .map((t) => +t);
const cleanedD = distances
  .split(" ")
  .filter((t) => t !== "")
  .map((t) => +t);

const answer = cleanedT.reduce((prev, t, idx) => {
  let counter = 0;
  const d = cleanedD[idx];
  for (let hold = 1; hold < t; hold++) {
    let remainingRunningTime = t - hold;
    let distanceTraveled = remainingRunningTime * hold;
    if (distanceTraveled > d) {
      counter++;
    }
  }
  return prev * counter;
}, 1);

console.log(answer);
