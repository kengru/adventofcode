import { readFileSync } from "node:fs";

console.time("bench");

type Edge = {
  ref: string;
  dist: number;
};

class Graph {
  nl: { [k: string]: Edge[] } = {};

  constructor() {
    this.nl = {};
  }

  addNode(node: string) {
    this.nl[node] = [];
  }

  hasNode(node: string): boolean {
    return !!this.nl[node];
  }

  addEdge(n1: string, n2: string, weight: number) {
    this.nl[n1].push({
      ref: n2,
      dist: weight,
    });
    this.nl[n2].push({
      ref: n1,
      dist: weight,
    });
  }

  getDist(n1: string, n2: string) {
    return this.nl[n1].find((v) => v.ref === n2)?.dist ?? 0;
  }

  isEdge(n1: string, n2: string): boolean {
    return !!this.nl[n1].find((v) => v.ref === n2);
  }

  dfs(startingNode: string, visited = new Set()): number {
    let a: number[] = [];
    visited.add(startingNode);
    this.nl[startingNode].forEach((n) => {
      if (!visited.has(n.ref)) {
        let dist = n.dist;
        let res = this.dfs(n.ref, visited);
        a.push(dist + res);
      }
    });
    visited.delete(startingNode);
    return a.length ? Math.max(...a) : 0;
  }
}

const buffer = readFileSync("2015/09-single-night/input.txt");
const routes = buffer.toString().split("\n");
const gp = new Graph();

for (let i = 0; i < routes.length; i++) {
  const p1 = routes[i].split(" to ")[0];
  const p2 = routes[i].split(" to ")[1].split(" = ")[0];
  const dist = routes[i].split(" to ")[1].split(" = ")[1];
  if (!gp.hasNode(p1)) {
    gp.addNode(p1);
  }
  if (!gp.hasNode(p2)) {
    gp.addNode(p2);
  }
  gp.addEdge(p1, p2, +dist);
}

const s: number[] = [];
Object.keys(gp.nl).forEach((c) => {
  s.push(gp.dfs(c));
});

console.timeEnd("bench");

console.log(Math.max(...s));
