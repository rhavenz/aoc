import * as path from "jsr:@std/path";

const part1 = async () => {
  const input = await Deno.readTextFile(
    path.join(Deno.cwd(), "day5", "part1.input"),
  );

  const raw = input.split("\n\n");
  const updates = raw[1];

  const rules: { [key: number]: number[] } = {};
  for (const [a, b] of raw[0].split("\n").map((rule) => rule.split("|").map(Number))) {
    if (!rules[a]) {
      rules[a] = [b];
    } else {
      rules[a].push(b);
    }
  }

  console.log(
    updates.split("\n").map((u) => u.split(",").map(Number))
      .filter((update) =>
        !update.some((val, idx) =>
          update.slice(0, idx).some((pageNum) => rules[val] ? rules[val].includes(pageNum) : false)
        )
      )
      .map((update) => update[Math.floor(update.length / 2)])
      .reduce((a, b) => a + b),
  );
};

const part2 = async () => {
  const input = await Deno.readTextFile(
    path.join(Deno.cwd(), "day5", "part2.input"),
  );

  const raw = input.split("\n\n");
  const updates = raw[1];

  const rules: { [key: number]: number[] } = {};
  for (const [a, b] of raw[0].split("\n").map((rule) => rule.split("|").map(Number))) {
    if (!rules[a]) {
      rules[a] = [b];
    } else {
      rules[a].push(b);
    }
  }

  console.log(
    updates.split("\n").map((u) => u.split(",").map(Number))
      .filter((update) =>
        update.some((val, idx) =>
          update.slice(0, idx).some((pageNum) => rules[val] ? rules[val].includes(pageNum) : false)
        )
      )
      .map((update) => update.sort((a, b) => (rules[a] ?? []).includes(b) ? -1 : (rules[b] ?? []).includes(a) ? 1 : 0))
      .map((update) => update[Math.floor(update.length / 2)])
      .reduce((a, b) => a + b),
  );
};

await part1();
console.log("------------------------");
await part2();
