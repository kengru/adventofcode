import { readFileSync } from "node:fs";

const buffer = readFileSync("2015/06-fire-hazard/input.txt");
const instructions = buffer.toString().split("\n");
const bombillos = new Set();

console.time("t");

function turnOn(v: string) {
  bombillos.add(v);
}

function turnOff(v: string) {
  bombillos.delete(v);
}

function toggle(v: string) {
  if (bombillos.has(v)) {
    bombillos.delete(v);
    return;
  }
  bombillos.add(v);
}

function getCoords(v: string): number[] {
  const vs = v.split(" ");
  const first = vs[0].split(",").map((v) => +v);
  const second = vs[2].split(",").map((v) => +v);
  return [...first, ...second];
}

for (let i = 0; i < instructions.length; i++) {
  const inst = instructions[i];
  if (inst.startsWith("turn on")) {
    const coords = getCoords(inst.split("turn on ").join(""));
    const [x, y, x2, y2] = coords;
    for (let xx = x; xx <= x2; xx++) {
      for (let yy = y; yy <= y2; yy++) {
        turnOn(`${xx},${yy}`);
      }
    }
  }
  if (inst.startsWith("turn off")) {
    const coords = getCoords(inst.split("turn off ").join(""));
    const [x, y, x2, y2] = coords;
    for (let xx = x; xx <= x2; xx++) {
      for (let yy = y; yy <= y2; yy++) {
        turnOff(`${xx},${yy}`);
      }
    }
  }
  if (inst.startsWith("toggle")) {
    const coords = getCoords(inst.split("toggle ").join(""));
    const [x, y, x2, y2] = coords;
    for (let xx = x; xx <= x2; xx++) {
      for (let yy = y; yy <= y2; yy++) {
        toggle(`${xx},${yy}`);
      }
    }
  }
}

console.log(bombillos.size);

console.timeEnd("t");
