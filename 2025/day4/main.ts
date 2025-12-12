const isOk = ({ lines, y, x }: { lines: string[][]; x: number; y: number }) => {
  let count = 0;

  for (
    const [incrY, incrX] of [
      [1, -1], // Bottom Left
      [0, -1], // Left
      [-1, -1], // Top Left
      [-1, 0], // Top
      [-1, 1], // Top Right
      [0, 1], // Right
      [1, 1], // Bottom Right
      [1, 0], // Bottom
    ]
  ) {
    if (lines[y + incrY]?.[x + incrX] === "@") {
      count += 1;
    }

    if (count >= 4) {
      return false;
    }
  }

  return true;
};

const part1 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const lines = input.split("\n").map((line) => line.split(""));
  let result = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === ".") {
        continue;
      }

      if (isOk({ lines, y, x })) {
        result += 1;
      }
    }
  }

  return result;
};

const part2 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const lines = input.split("\n").map((line) => line.split(""));
  let result = 0;

  const pass = () => {
    let count = 0;
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[0].length; x++) {
        if (lines[y][x] === ".") {
          continue;
        }

        if (isOk({ lines, y, x })) {
          lines[y][x] = ".";
          count += 1;
        }
      }
    }

    return count;
  };

  while (true) {
    const res = pass();
    if (res === 0) {
      break;
    }

    result += res;
  }

  return result;
};

for (const [idx, p] of Object.entries([part1, part2])) {
  const res = await p();
  console.log(`Part${Number(idx) + 1}: ${res}`);
}
