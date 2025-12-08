const part1 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const banks = input.split("\n").filter(Boolean);
  let count = 0;

  for (const bank of banks) {
    const bank_ = bank.split("").map(Number);
    const first = Math.max(...bank_.slice(0, bank_.length - 1));
    const idx = bank_.findIndex((value) => value === first);
    const second = Math.max(...bank_.slice(idx + 1));
    count += Number(`${first}${second}`);
  }

  return count;
};

const part2 = async () => {
  const input = await Deno.readTextFile("input.txt");
  const banks = input.split("\n").filter(Boolean);
  let count = 0;

  for (const bank of banks) {
    const length = 12;
    const joltage: number[] = [];
    let value = bank.split("").map(Number);
    for (let i = 1; i <= length; i++) {
      const slice = value.slice(0, -length + i >= 0 ? undefined : -length + i);

      if (slice.length === 0) {
        joltage.push(value[0]);
        value = value.slice(1);
        continue;
      }

      const max = Math.max(...slice);
      const lastIdx = value.findIndex((value) => value === max) + 1;
      value = value.slice(lastIdx);
      joltage.push(max);
    }

    count += Number(joltage.join(""));
  }

  return count;
};

for (const [idx, p] of Object.entries([part1, part2])) {
  const res = await p();
  console.log(`Part${Number(idx) + 1}: ${res}`);
}
