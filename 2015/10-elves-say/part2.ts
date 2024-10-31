let input = "1113222113";

console.time("t");

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

for (let i = 0; i < 60; i++) {
  input = parseSay(input);
}

console.log(input.length);

console.timeEnd("t");
