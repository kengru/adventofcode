import { readFileSync } from "node:fs";

const limits: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14
};

const buffer = readFileSync("src/02-cube-conundrum/input.txt");
const input = buffer.toString().split("\n");

const games = input.reduce((prev, line) => {
  const [gameId, cubes] = line.split(": ");
  const id = gameId.split(" ")[1];

  const sets = cubes.split(";").map((set) => {
    const individualCubes = set.split(",").map((cube) => {
      const [value, color] = cube.trim().split(" ");
      return +value <= limits[color];
    });
    return individualCubes.every((cube) => cube);
  });

  return sets.every((set) => set) ? prev + +id : prev;
}, 0);

console.log(games);
