console.time("bench");

let input2 = "1113222113";

function parseSay2(v: string): string {
  let newV = "";
  for (let i = 0; i < v.length; i++) {
    v[i];
    let cont = 1;
    while (v[i + cont] === v[i]) {
      cont++;
    }
    i += cont - 1;
    newV += `${cont}${v[i]}`;
  }
  return newV;
}

for (let i = 0; i < 40; i++) {
  input2 = parseSay2(input2);
}

console.timeEnd("bench");

console.log(input2.length);
