import { isValid, nextPassword } from "./utils";

console.time("bench");

let inputTx = "hxbxwxba";

let v = 0;
while (v < 2) {
  inputTx = nextPassword(inputTx);
  if (isValid(inputTx)) {
    v++;
  }
}

console.timeEnd("bench");

console.log(inputTx);
