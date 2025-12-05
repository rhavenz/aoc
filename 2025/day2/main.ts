const part1 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const ranges = input.split(",").map((range) => range.split("-").map(Number));
  let count = 0;
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const value = String(i);
      const length = value.length;
      if (length % 2 === 0) {
        if (value.slice(0, length / 2) === value.slice(length / 2)) {
          count += i;
        }
      }
    }
  }

  return count;
};

const part2 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const ranges = input.split(",").map((range) => range.split("-").map(Number));
  let count = 0;
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const value = i.toString();
      const length = value.length;

      for (let size = 1; size < length; size++) {
        if (length % size !== 0) {
          continue;
        }

        const values: string[] = [];
        for (let y = 0; y < length / size; y++) {
          values.push(value.slice(y * size, (y + 1) * size));
        }

        if (values.every((v) => v === values[0])) {
          count += i;
          break;
        }
      }
    }
  }

  return count;
};

for (const [idx, p] of Object.entries([part1, part2])) {
  const res = await p();
  console.log(`Part${Number(idx) + 1}: ${res}`);
}
