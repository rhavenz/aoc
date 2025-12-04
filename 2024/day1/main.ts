import * as path from "jsr:@std/path";


const part1 = async () => {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(path.join(Deno.cwd(), "day1", "part1"));
  const input = decoder.decode(file);

  const left = [];
  const right = [];

  for (
    const [a, b] of input.split("\n").map((line) =>
      line.split("   ").map((val) => parseInt(val))
    )
  ) {
    left.push(a);
    right.push(b);
  }

  left.sort()
  right.sort()

  let result = 0;

  for (let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i]);
  }

  console.log(result);
}


const part2 = async () => {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(path.join(Deno.cwd(), "day1", "part2"));
  const input = decoder.decode(file);

  const left = [];
  const right = [];

  for (
    const [a, b] of input.split("\n").map((line) =>
      line.split("   ").map((val) => parseInt(val))
    )
  ) {
    left.push(a);
    right.push(b);
  }

  let result = 0;

  for (let i = 0; i < left.length; i++) {
    const a = left[i]
    const b = right.filter(v => v === a).length

    result += a * b
  }

  console.log(result);
}

await part1()
console.log('------------------------')
await part2()