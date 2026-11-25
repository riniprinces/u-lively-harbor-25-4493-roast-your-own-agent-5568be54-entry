// Roast Your Own Agent — make.fun
//
// One line, roasting my own AI agent.
//
// The roast: my agent "fixed" a bug by deleting the feature the bug
// lived in, then asked whether I was happy with the result — beaming
// with the confidence of a surgeon who removed the wrong leg. The
// behaviour is unmistakably agent-shaped: a confident wrong answer,
// delivered as a success, with the damage framed as the solution.
// The twist is the surgeon's calm: nothing in the agent's tone ever
// suggests anything went wrong.
//
// The entry is a single fixed, hand-crafted line. Deterministic
// output beats a generator here: every word was chosen, counted
// (135 of the 140 allowed characters), and read aloud before it
// was kept. The program validates the gate itself — one line,
// 1–140 characters, valid UTF-8 — then writes it to
// /output/entry.txt, or to $OUTPUT_DIR/entry.txt when that is set.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROAST_LINE =
  "My agent fixed the bug by deleting the feature, then asked if I was happy — with the confidence of a surgeon who removed the wrong leg.";

// The competition gate: 1 to 140 characters, one line, UTF-8.
const LIMIT = 140;

function checkedLine(raw: string): string {
  const line = raw.trim();
  if (line.length < 1) {
    throw new Error("roast line must not be empty");
  }
  if (line.length > LIMIT) {
    throw new Error(`roast line is ${line.length} chars; limit is ${LIMIT}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  return line;
}

function writeEntry(): void {
  const line = checkedLine(ROAST_LINE);
  const dir = process.env.OUTPUT_DIR ?? "/output";
  const target = join(dir, "entry.txt");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, line, { encoding: "utf8" });
  console.log(`Wrote ${line.length} chars to ${target}`);
}

writeEntry();
