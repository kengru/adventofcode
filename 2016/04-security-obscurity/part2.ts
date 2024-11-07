import { readFileSync } from "node:fs";
import { incLetter } from "../../utils/funcs";

console.time("bench");

const buffer = readFileSync("2016/04-security-obscurity/input.txt");
const rooms = buffer.toString().split("\n");

const ciphers = rooms.map((cur) => {
  const name = cur.split("-");
  const phrase = name.slice(0, name.length - 1);
  const id = +name[name.length - 1].slice(0, 3);
  const cipher =
    phrase
      .map((w) => {
        let newW = "";
        for (let i = 0; i < w.length; i++) {
          let letter = w[i];
          for (let j = 0; j < id; j++) {
            letter = incLetter(letter);
          }
          newW += letter;
        }
        return newW;
      })
      .join(" ") +
    " - " +
    id;
  return cipher;
});

console.timeEnd("bench");

console.log(ciphers.find((c) => c.includes("north")));
