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

const seedLocations = seedList.split(" ").map((seed) => {
  let location = +seed;
  hugeMap.forEach((map) => {
    location = getSeedTransform(location, map);
  });
  return location;
});

console.timeEnd("bench");

console.log(Math.min(...seedLocations));
