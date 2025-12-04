import * as path from "jsr:@std/path";

const part1 = async () => {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(
    path.join(Deno.cwd(), "day3", "part1.input"),
  );
  const input = decoder.decode(file);
  const re = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
  let result = 0;

  while (true) {
    const match = re.exec(input);

    if (!match) {
      break;
    }

    const [, a, b] = Array.from(match);

    result += Number(a) * Number(b);
  }

  console.log(result);
};

const part2 = async () => {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(
    path.join(Deno.cwd(), "day3", "part2.input"),
  );
  const input = decoder.decode(file);
  const re = /(mul\(([0-9]{1,3}),([0-9]{1,3})\))|(do\(\))|(don't\(\))/g;
  let enabled = true;
  let result = 0;

  while (true) {
    const match = re.exec(input);

    if (!match) {
      break;
    }

    const [instr, , a, b] = Array.from(match);

    if (instr === `don't()`) {
      enabled = false;
      continue;
    }

    if (instr === "do()") {
      enabled = true;
      continue;
    }

    if (enabled) {
      result += Number(a) * Number(b);
    }
  }

  console.log(result);
};

await part1();
console.log("------------------------");
await part2();
