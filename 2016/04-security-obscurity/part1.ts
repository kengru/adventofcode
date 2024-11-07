import { readFileSync } from "node:fs";
import { FreqMap } from "../../utils/structs";

console.time("bench");

const buffer = readFileSync("2016/04-security-obscurity/input.txt");
const rooms = buffer.toString().split("\n");

const sum = rooms.reduce((prev, cur) => {
  const name = cur.split("-");
  const id = +name[name.length - 1].slice(0, 3);
  const checksum = name[name.length - 1].slice(4, 9);
  const freq = new FreqMap();
  for (let i = 0; i < name.length - 1; i++) {
    freq.addMultiple(name[i].split(""));
  }
  const gp = freq.groupByFreq();
  let partial = "";
  Object.keys(gp)
    .sort((a, b) => +b - +a)
    .forEach((v) => {
      let i = 0;
      const lts = [...gp[+v]].sort();
      while (partial.length < checksum.length && i < lts.length) {
        partial += lts[i];
        i++;
      }
    });
  return prev + (partial === checksum ? id : 0);
}, 0);

console.timeEnd("bench");

console.log(sum);
