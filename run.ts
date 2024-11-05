import { exec } from "child_process";
import { readdir } from "fs";

const arg = process.argv[2];
const [year, ex, part] = arg.split("/");

function sendExecStdout(line: string) {
  exec(line, (err, stout) => {
    if (err) {
      console.error(`couldn't find exercise: ${line.split("npx ts-node ")[1]}`);
      return;
    }
    console.log(`${line}:\n${stout}`);
  });
}

if (part !== undefined && part !== "1" && part !== "2") {
  console.error(`incorrect part number`);
  process.exit(1);
}

if (ex === "") {
  console.error(`incorrect ex number`);
  process.exit(1);
}

readdir(year, (err, files) => {
  if (err) {
    console.error(`the year ${year} does not exists`);
    process.exit(1);
  }
  if (ex) {
    const fullEx = files.find((v) => v.includes(ex));
    if (!fullEx) {
      console.error(`couldn't find the ${ex} exercise`);
      process.exit(1);
    }
    if (part) {
      sendExecStdout(`npx ts-node ${year}/${fullEx}/part${part}.ts`);
    } else {
      sendExecStdout(`npx ts-node ${year}/${fullEx}/part1.ts`);
      sendExecStdout(`npx ts-node ${year}/${fullEx}/part2.ts`);
    }
  } else {
    console.log("Files to execute:");
    files.forEach((v) => {
      console.log(v);
      sendExecStdout(`npx ts-node ${year}/${v}/part1.ts`);
      sendExecStdout(`npx ts-node ${year}/${v}/part2.ts`);
    });
  }
});
