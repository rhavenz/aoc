import * as path from "jsr:@std/path";

const part1 = async () => {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(path.join(Deno.cwd(), "day2", "part1"));
  const input = decoder.decode(file);
  const reports = input.split("\n").map((report) =>
    report.split(" ").map(Number)
  );

  let result = 0;

  const isSafe = (report: number[], mode: "ASC" | "DESC") => {
    for (let i = 0; i < report.length; i++) {
      const curr = report[i];
      const next = report[i + 1];
      const diff = next - curr;
      const abs = Math.abs(diff);

      if (!next) {
        continue;
      }

      if (mode === "ASC" && diff > 0 && abs >= 1 && abs <= 3) {
        continue;
      }

      if (mode === "DESC" && diff < 0 && abs >= 1 && abs <= 3) {
        continue;
      }

      return false;
    }

    return true;
  };

  for (const report of reports) {
    if (isSafe(report, "ASC") || isSafe(report, "DESC")) {
      result += 1;
    }
  }

  console.log(result);
};

const part2 = async () => {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(path.join(Deno.cwd(), "day2", "part2"));
  const input = decoder.decode(file);
  const reports = input.split("\n").map((report) =>
    report.split(" ").map(Number)
  );

  let result = 0;

  const isSafe = (report: number[], mode: "ASC" | "DESC") => {
    for (let i = 0; i < report.length; i++) {
      const curr = report[i];
      const next = report[i + 1];
      const diff = next - curr;
      const abs = Math.abs(diff);

      if (!next) {
        continue;
      }

      if (mode === "ASC" && diff > 0 && abs >= 1 && abs <= 3) {
        continue;
      }

      if (mode === "DESC" && diff < 0 && abs >= 1 && abs <= 3) {
        continue;
      }

      return false;
    }

    return true;
  };

  for (const report of reports) {
    if (isSafe(report, "ASC") || isSafe(report, "DESC")) {
      result += 1;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      const report_ = (() => {
        if (i === 0) {
          return report.slice(i + 1);
        }

        if (i === report.length - 1) {
          return report.slice(0, i);
        }

        return report.slice(0, i).concat(report.slice(i + 1));
      })();

      if (isSafe(report_, "ASC") || isSafe(report_, "DESC")) {
        result += 1;
        break;
      }
    }
  }

  console.log(result);
};

await part1();
console.log("------------------------");
await part2();
