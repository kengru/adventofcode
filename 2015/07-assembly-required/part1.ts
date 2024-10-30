import { readFileSync } from "node:fs";

type ValOp = {
  v: number | undefined;
  ops: string[];
};
type Inst = { [k: string]: ValOp };

const buffer = readFileSync("2015/07-assembly-required/input.txt");
const instructions = buffer.toString().split("\n");
const wires: Inst = {};

console.time("t");

function parseOperation(operation: string, wire: string): boolean {
  if (!wires[wire]) {
    wires[wire] = {
      v: undefined,
      ops: [],
    };
  }
  if (operation.includes("AND")) {
    const [w1, w2] = operation.split(" AND ");
    let k = wires[w1]?.v;
    let p = wires[w2]?.v;
    if (!isNaN(+w1)) {
      k = wires[w1]?.v ?? +w1;
    }
    if (!isNaN(+w2)) {
      p = wires[w2]?.v ?? +w2;
    }
    if (k !== undefined && p !== undefined) {
      wires[wire].v = k & p;
    } else {
      if (!wires[wire].ops.includes(operation)) {
        wires[wire].ops.push(operation);
      }
      return false;
    }
    return true;
  }
  if (operation.includes("OR")) {
    const [w1, w2] = operation.split(" OR ");
    let k = wires[w1]?.v;
    let p = wires[w2]?.v;
    if (!isNaN(+w1)) {
      k = wires[w1]?.v ?? +w1;
    }
    if (!isNaN(+w2)) {
      p = wires[w2]?.v ?? +w2;
    }
    if (k !== undefined && p !== undefined) {
      wires[wire].v = k | p;
    } else {
      if (!wires[wire].ops.includes(operation)) {
        wires[wire].ops.push(operation);
      }
      return false;
    }
    return true;
  }
  if (operation.includes("LSHIFT")) {
    const [w1, w2] = operation.split(" LSHIFT ");
    let k = wires[w1]?.v;
    let p = wires[w2]?.v;
    if (!isNaN(+w1)) {
      k = wires[w1]?.v ?? +w1;
    }
    if (!isNaN(+w2)) {
      p = wires[w2]?.v ?? +w2;
    }
    if (k !== undefined && p !== undefined) {
      wires[wire].v = k << p;
    } else {
      if (!wires[wire].ops.includes(operation)) {
        wires[wire].ops.push(operation);
      }
      return false;
    }
    return true;
  }
  if (operation.includes("RSHIFT")) {
    const [w1, w2] = operation.split(" RSHIFT ");
    let k = wires[w1]?.v;
    let p = wires[w2]?.v;
    if (!isNaN(+w1)) {
      k = wires[w1]?.v ?? +w1;
    }
    if (!isNaN(+w2)) {
      p = wires[w2]?.v ?? +w2;
    }
    if (k !== undefined && p !== undefined) {
      wires[wire].v = k >> p;
    } else {
      if (!wires[wire].ops.includes(operation)) {
        wires[wire].ops.push(operation);
      }
      return false;
    }
    return true;
  }
  if (operation.includes("NOT")) {
    const [_, w2] = operation.split(" ");
    let k = wires[w2]?.v;
    if (!isNaN(+w2)) {
      k = wires[w2]?.v ?? +w2;
    }
    if (k !== undefined) {
      wires[wire].v = 65536 + ~k;
    } else {
      if (!wires[wire].ops.includes(operation)) {
        wires[wire].ops.push(operation);
      }
      return false;
    }
    return true;
  }
  if (isNaN(+operation)) {
    if (wires[operation] !== undefined && wires[operation].ops.length === 0) {
      wires[wire].v = wires[operation].v;
      return true;
    } else {
      if (!wires[wire].ops.includes(operation)) {
        wires[wire].ops.push(operation);
      }
      return false;
    }
  }
  wires[wire].v = +operation;
  return true;
}

for (let i = 0; i < instructions.length; i++) {
  const [operation, finalWire] = instructions[i].split(" -> ");
  parseOperation(operation, finalWire);
}

let p22 = 0;
while (wires["a"].ops.length !== 0) {
  Object.keys(wires).forEach((k) => {
    const cas = wires[k];
    const cp = [...cas.ops];
    for (let i = 0; i < cp.length; i++) {
      const finished = parseOperation(cp[i], k);
      if (finished) {
        wires[k].ops.splice(i, 1);
      }
    }
  });
  p22++;
}

console.log(wires["a"]);
console.log(p22);

console.timeEnd("t");
