import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "fs";
import { promises } from "readline";

async function askQuestion(query: string): Promise<string> {
  const rl = promises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const ans = await rl.question(query);
  rl.close();
  return ans;
}

async function main() {
  const year = await askQuestion("Year of the AoC: ");
  if (year.length != 4 || !+year) {
    console.error("error parsing year");
    process.exit(1);
  }
  const ex = await askQuestion("Exercise name: ");
  const inputFile = await askQuestion("Does it have an input file (y | n)?: ");
  const txtExists = inputFile === "y";

  try {
    if (!existsSync(year)) {
      mkdirSync(year);
    }
    mkdirSync(`${year}/${ex}`);
    writeFileSync(`${__dirname}/${year}/${ex}/README.md`, "## --- ");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  const part1Stream = createWriteStream(`${__dirname}/${year}/${ex}/part1.ts`);
  if (txtExists) {
    writeFileSync(`${__dirname}/${year}/${ex}/input.txt`, "");
    part1Stream.write(`import { readFileSync } from "node:fs";\n\n`);
    part1Stream.write(`console.time("bench");\n\n`);
    part1Stream.write(
      `const buffer = readFileSync("${year}/${ex}/input.txt");\n`
    );
    part1Stream.write(`const parsed = buffer.toString();\n\n`);
    part1Stream.write(`console.timeEnd("bench");\n`);
  } else {
    part1Stream.write(`console.time("bench");\n\n`);
    part1Stream.write(`console.timeEnd("bench");\n`);
  }
}

main();
