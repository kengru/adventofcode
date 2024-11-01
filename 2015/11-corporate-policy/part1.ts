let txtInput = "hxbxwxba";

function incLetter(l: string): string {
  const v = l.charCodeAt(0) + 1 > 122 ? 97 : l.charCodeAt(0) + 1;

  return String.fromCharCode(v);
}

function nextPassword(seq: string): string {
  const om = seq.split("");
  let less = 1;
  let keep = true;
  while (keep) {
    const nx = incLetter(om[om.length - less]);
    om[om.length - less] = nx;
    if (nx === "a") {
      less++;
    } else {
      keep = false;
    }
  }
  return om.join("");
}

function isValid(pass: string): boolean {
  let valid = false;
  // Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
  for (let i = 0; i < pass.length - 2; i++) {
    if (
      pass[i + 2].charCodeAt(0) -
        pass[i + 1].charCodeAt(0) -
        pass[i].charCodeAt(0) ===
      -pass[i] + 1
    ) {
      valid = true;
    }
  }

  return valid;
}

console.time("t");

console.log(txtInput);
let v = false;
while (!v) {
  txtInput = nextPassword(txtInput);
  console.log(txtInput);
  if (isValid(txtInput)) {
    v = true;
  }
}

console.timeEnd("t");
