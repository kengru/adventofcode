export const digits: { [key: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
};
const numbers = [...Object.keys(digits), ...Object.values(digits)];

export function getFirstNumber(line: string) {
  let lastIdx = line.length - 1;
  let lastNum = "";

  numbers.forEach((n) => {
    const i = line.indexOf(n);
    if (i <= lastIdx && i !== -1) {
      lastIdx = i;
      lastNum = n;
    }
  });

  return lastNum;
}

export function getLastNumber(line: string) {
  let lastIdx = 0;
  let lastNum = "";

  numbers.forEach((n) => {
    const i = line.lastIndexOf(n);
    if (i >= lastIdx && i !== -1) {
      lastIdx = i;
      lastNum = n;
    }
  });

  return lastNum;
}

export function strToNum(first: string, last: string) {
  let newFirst = first;
  let newLast = last;
  if (digits[first]) {
    newFirst = digits[first];
  }
  if (digits[last]) {
    newLast = digits[last];
  }
  return parseInt(newFirst + newLast);
}
