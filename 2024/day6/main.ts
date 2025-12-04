import * as path from "jsr:@std/path";

const input = await Deno.readTextFile(
  path.join(Deno.cwd(), "day6", "puzzle.input"),
);

const rotate = (matrix: string[][]) => matrix[0].map((_, i) => matrix.map((m) => m[i]).reverse());

const find = (matrix: string[][]) => {
  const match = /[\^v<>]/.exec(matrix.map((line) => line.join("")).join(""))!;

  return [
    { x: match.index % matrix[0].length, y: Math.floor(match.index / matrix.length) },
    match[0] === ">" ? 3 : match[0] === "<" ? 1 : match[0] === "^" ? 0 : 2,
  ] as const;
};

const canGoTop = (matrix: string[][], pos: { x: number; y: number }) => {
  if (matrix[pos.y]?.[pos.x] == null) {
    return false;
  }

  if (matrix[pos.y - 1]?.[pos.x] === "#") {
    return false;
  }

  return true;
};

const moveTop = (matrix: string[][], pos: { x: number; y: number }) => {
  const tmp = matrix[pos.y][pos.x];
  matrix[pos.y][pos.x] = "X";
  if (matrix[pos.y - 1]?.[pos.x] != null) {
    matrix[pos.y - 1][pos.x] = tmp;
  }
  pos.y = pos.y - 1;
};

const lookAhead = (matrix: string[][], pos: { x: number; y: number }) => {
  return matrix[pos.y - 1]?.[pos.x];
};

const play = (board: string[][]): string[][] => {
  let buf: string[] = [];
  let [guard, dir] = find(board);

  while (dir !== 0) {
    board = rotate(board);
    dir = dir + 1 % 4;
  }

  for (;;) {
    while (canGoTop(board, guard)) {
      buf.push(lookAhead(board, guard));
      moveTop(board, guard);
      buf = buf.slice(-100);
      if (buf.every((v) => v === "X")) {
        throw 42;
      }
    }

    if (guard.x < 0 || guard.x > board[0].length - 1 || guard.y < 0 || guard.y > board.length - 1) {
      break;
    }

    for (let i = 0; i < 3; i++) {
      board = rotate(board);
      guard = find(board)[0];
    }
  }

  return board;
};

const part1 = () =>
  console.log(play(input.split("\n").map((line) => line.split(""))).flat().filter((v) => v === "X").length);

const part2 = () => {
  let result = 0;
  const board = input.split("\n").map((line) => line.split(""));

  for (let i = 0; i < board.length * board[0].length; i++) {
    const customBoard = board.map((line) => line.join("")).map((line) => line.split(""));
    const x = i % board[0].length;
    const y = Math.floor(i / board.length);
    if (customBoard[y][x] !== ".") {
      continue;
    }
    customBoard[y][x] = "#";
    try {
      play(customBoard);
    } catch {
      result += 1;
    }
  }

  console.log(result);
};

part1();
console.log("------------------------");
part2();
