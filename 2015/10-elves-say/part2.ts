console.time("bench");

let input = "1113222113";

function parseSay(v: string): string {
  let newV = "";
  for (let i = 0; i < v.length; i++) {
    const current = v[i];
    let cont = 1;
    while (v[i + cont] === current) {
      cont++;
    }
    i += cont - 1;
    newV += `${cont}${current}`;
  }
  return newV;
}

for (let i = 0; i < 50; i++) {
  input = parseSay(input);
}

console.timeEnd("bench");

console.log(input.length);
