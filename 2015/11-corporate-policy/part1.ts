import { isValid, nextPassword } from "./utils";

console.time("bench");

let txtInput = "hxbxwxba";

let valid = false;
while (!valid) {
  txtInput = nextPassword(txtInput);
  if (isValid(txtInput)) {
    valid = true;
  }
}

console.timeEnd("bench");

console.log(txtInput);
