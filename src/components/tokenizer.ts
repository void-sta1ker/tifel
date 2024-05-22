import type Config from "../types/config";

function tokenizer(config: Config, input: string): string[] {
  return input
    .trim()
    .split(/\s+/)
    .map((token) => token.trim());
}

export default tokenizer;
