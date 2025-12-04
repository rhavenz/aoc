const part1 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const lines = input.split("\n");
  let pos = 50;
  let count = 0;

  for (const line of lines) {
    const [direction, ...rest] = line;
    const times = Number(rest.join(""));

    if (direction === "R") {
      pos = (pos + times) % 100;
    } else {
      pos = (pos + 100 - times) % 100;
    }

    if (pos === 0) {
      count += 1;
    }
  }

  return count;
};

const part2 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const lines = input.split("\n");
  let pos = 50;
  let count = 0;

  for (const line of lines) {
    const [direction, ...rest] = line;
    const times = Number(rest.join(""));
    for (let i = 0; i < times; i++) {
      if (direction === "R") {
        pos = (pos + 1) % 100;
      } else {
        pos = (pos + 100 - 1) % 100;
      }

      if (pos === 0) {
        count += 1;
      }
    }
  }

  return count;
};

for (const [idx, p] of Object.entries([part1, part2])) {
  const res = await p();
  console.log(`Part${Number(idx) + 1}: ${res}`);
}
