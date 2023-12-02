import { readFileSync } from "node:fs";

const buffer = readFileSync("src/02-cube-conundrum/input.txt");
const input = buffer.toString().split("\n");

const games = input.reduce((prev, line) => {
  const [_, cubes] = line.split(": ");
  const lowest: { [key: string]: number } = {
    red: 0,
    green: 0,
    blue: 0
  };

  cubes.split(";").forEach((set) => {
    set.split(",").forEach((cube) => {
      const [value, color] = cube.trim().split(" ");
      lowest[color] = Math.max(lowest[color], +value);
    });
  });

  return prev + lowest.red * lowest.green * lowest.blue;
}, 0);

console.log(games);
