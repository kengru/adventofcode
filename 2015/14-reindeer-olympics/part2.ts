import { readFileSync } from "node:fs";

type Rein = {
  vel: number;
  long: number;
  rest: number;
  dist: number;
  moving: boolean;
  movement: number;
  resting: number;
};

console.time("bench");

const buffer = readFileSync("2015/14-reindeer-olympics/input.txt");
const parsed = buffer.toString().split("\n");
const reindeers: Rein[] = [];
const scores: number[] = [];
let max = 0;

parsed.forEach((v) => {
  const velraw = v.split(" km/s")[0];
  const vel = +velraw.split("fly ")[1];
  const longraw = v.split("km/s for ")[1];
  const long = +longraw.split(" seconds,")[0];
  const restraw = v.split("rest for ")[1];
  const rest = +restraw.split(" seconds.")[0];
  scores.push(0);
  reindeers.push({
    vel,
    long,
    rest,
    dist: 0,
    movement: 0,
    resting: 0,
    moving: true,
  });
});

let count = 0;
while (count < 2503) {
  let max = 0;
  for (let i = 0; i < reindeers.length; i++) {
    const r = reindeers[i];
    if (r.movement === r.long) {
      r.resting = 0;
      r.movement = 0;
      r.moving = false;
    }
    if (r.resting === r.rest) {
      r.resting = 0;
      r.movement = 0;
      r.moving = true;
    }
    if (r.moving) {
      r.dist += r.vel;
      r.movement += 1;
    } else {
      r.resting += 1;
    }
    if (r.dist > max) {
      max = r.dist;
    }
  }
  for (let i = 0; i < reindeers.length; i++) {
    if (reindeers[i].dist === max) {
      scores[i] += 1;
    }
  }
  count += 1;
}

console.log(Math.max(...scores));

console.timeEnd("bench");
