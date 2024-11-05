console.time("bench");

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

function hasTwoPairs(pass: string): boolean {
  let a = "a";
  let amt = 0;
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] === pass[i + 1]) {
      a = pass[i];
      amt = 1;
      i += 2;
    }
  }
  return false;
}

function isValid(pass: string): boolean {
  let r12 = false;
  let r3 = false;
  // Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
  if (pass.includes("i") || pass.includes("o") || pass.includes("l")) {
    return false;
  }
  // Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
  for (let i = 0; i < pass.length - 1; i++) {
    if (pass[i] === pass[i + 1]) {
      r12 = true;
      break;
    }
  }
  // Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
  for (let i = 0; i < pass.length - 2; i++) {
    let p1 = pass[i].charCodeAt(0) + 2;
    let p2 = pass[i + 1].charCodeAt(0) + 1;
    let p3 = pass[i + 2].charCodeAt(0);
    if (p1 === p2 && p2 === p3) {
      r3 = true;
    }
  }

  return r12 && r3;
}

let v = false;
while (!v) {
  txtInput = nextPassword(txtInput);
  if (isValid(txtInput)) {
    v = true;
  }
}

console.timeEnd("bench");
