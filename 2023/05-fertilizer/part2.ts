import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2023/05-fertilizer/input.txt");
const [seeds, ...maps] = buffer.toString().split("\n\n");
const seedList = seeds.split(": ")[1];

const hugeMap = maps.map((map) => map.split("\n").slice(1));

function getSeedTransform(seed: number, map: string[]) {
  let location = seed;
  return map.reduce((prev, current) => {
    const [destination, source, range] = current.split(" ");
    const sourceLocation = +source;
    const destinationLocation = +destination;
    const rangeSize = +range;
    if (location >= sourceLocation && location < sourceLocation + rangeSize) {
      return destinationLocation + (location - sourceLocation);
    }
    return prev;
  }, seed);
}

function getAllValues(seedList: string) {
  let lowest = Infinity;
  const values = seedList.split(" ");
  for (let i = 0; i < values.length; i += 2) {
    const start = +values[i];
    const count = +values[i + 1];
    for (let j = 0; j < count; j++) {
      let location = start + j;
      hugeMap.forEach((map) => {
        location = getSeedTransform(location, map);
      });
      lowest = Math.min(lowest, location);
    }
  }
  console.log(lowest);
  return lowest;
}

const lowest = getAllValues(seedList);

console.timeEnd("bench");

console.log(lowest);
