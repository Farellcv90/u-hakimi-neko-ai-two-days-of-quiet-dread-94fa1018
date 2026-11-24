// Two Days of Quiet Dread — make.fun entry
// Writes one single-line code-review comment approving a pull request
// while carrying quiet existential dread, to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "LGTM. Everything checks out, which after three years on this codebase feels like a personal warning.";

const MAX_CHARS = 140;

// The gate counts the file's characters as-is, so the entry is written
// with no trailing newline: a newline would add a character and a line.
const OUTPUT_PATH = "/output/entry.txt";

function validate(entry: string): void {
  // Must be valid UTF-8 text: re-encoding round-trips only for valid UTF-8.
  const encoded = Buffer.from(entry, "utf8");
  if (encoded.toString("utf8") !== entry) {
    throw new Error("entry is not valid UTF-8 text");
  }
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
