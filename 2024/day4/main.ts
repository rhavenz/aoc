import * as path from "jsr:@std/path";

const part1 = async () => {
  const input = await Deno.readTextFile(
    path.join(Deno.cwd(), "day4", "part1.input"),
  );

  const lines = input.split("\n");

  function count(
    value: string,
  ): number {
    let count = 0;

    for (
      const re of [
        new RegExp(/(XMAS)/, "g"),
        new RegExp(/(SAMX)/, "g"),
      ]
    ) {
      for (;;) {
        const match = re.exec(value);

        if (!match) {
          break;
        }

        count += 1;
      }
    }

    return count;
  }

  console.log(
    [
      // H
      ...lines.map((line) => count(line)),
      // V
      ...lines[0].split("").map((_, i) => lines.map((line) => line[i]).join("")).map((v) => count(v)),
      // D ->
      ...lines.map((line, i) =>
        line.split("").map((cell, y) => {
          return { cell, idx: i + y };
        })
      ).flat().reduce<Array<Array<string>>>((a, b) => {
        if (!a[b.idx]) {
          a[b.idx] = [b.cell];
        } else {
          a[b.idx].push(b.cell);
        }
        return a;
      }, []).map((v) => count(v.join(""))),
      // D <-
      ...lines.map((line) => line.split("").reverse().join("")).map((line, i) =>
        line.split("").map((cell, y) => {
          return { cell, idx: i + y };
        })
      ).flat().reduce<Array<Array<string>>>((a, b) => {
        if (!a[b.idx]) {
          a[b.idx] = [b.cell];
        } else {
          a[b.idx].push(b.cell);
        }
        return a;
      }, []).map((v) => count(v.join(""))),
    ].reduce((a, b) => a + b),
  );
};

const part2 = async () => {
  const input = await Deno.readTextFile(
    path.join(Deno.cwd(), "day4", "part2.input"),
  );

  const lines = input.split("\n");

  function find(
    value: string,
  ) {
    const res = [];

    for (
      const re of [
        new RegExp(/(MAS)/, "g"),
        new RegExp(/(SAM)/, "g"),
      ]
    ) {
      for (;;) {
        const match = re.exec(value);

        if (!match) {
          break;
        }

        res.push(match.index + 1);
      }
    }

    return res;
  }

  const matches = lines.map((line, i) =>
    line.split("").map((cell, y) => {
      return { cell, idx: i + y, y: i, x: y };
    })
  ).flat().reduce<Array<Array<{cell: string, idx: number, y: number, x: number}>>>((a, b) => {
    if (!a[b.idx]) {
      a[b.idx] = [b];
    } else {
      a[b.idx].push(b);
    }

    return a;
  }, []).map(v => find(v.map(x => x.cell).join("")).map(i => v[i])).filter(a => a.length).flat()

  console.log(
    lines.map((line, i) =>
      line.split("").map((cell, y) => {
        return { cell, idx: i + (lines[0].length - 1 - y), y: i, x: y };
      })
    ).flat().reduce<Array<Array<{cell: string, idx: number, y: number, x: number}>>>((a, b) => {
      if (!a[b.idx]) {
        a[b.idx] = [b];
      } else {
        a[b.idx].push(b);
      }

      return a;
    }, []).map(v => find(v.map(x => x.cell).join("")).map(i => v[i])).filter(a => a.length).flat().reduce((a, b) => {
      if (matches.find(v => v.x === b.x && v.y === b.y)) {
        return a + 1
      }

      return a
    }, 0)
  );
};

await part1();
console.log("------------------------");
await part2();
