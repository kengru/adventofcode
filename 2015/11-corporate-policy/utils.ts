function incLetter(l: string): string {
  let v = l.charCodeAt(0) + 1 > 122 ? 97 : l.charCodeAt(0) + 1;
  if (v === 105 || v === 111 || v === 108) {
    v++;
  }

  return String.fromCharCode(v);
}

function hasTwoPairs(pass: string): boolean {
  let lt: string[] = [];
  let amt = 0;
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] === pass[i + 1] && !lt.includes(pass[i])) {
      lt.push(pass[i]);
      amt++;
      i++;
    }
  }
  return amt === 2;
}

export function nextPassword(seq: string): string {
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

export function isValid(pass: string): boolean {
  let r3 = false;
  // Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
  if (!hasTwoPairs(pass)) {
    return false;
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
  return r3;
}
