import type Config from "../types/config";
import type Context from "../types/context";

type TokenizerFn = (
  arg: Readonly<{
    config: Context["config"];
    input: Context["input"];
  }>
) => { config: Context["config"]; tokens: Context["tokens"] };

const tokenizer: TokenizerFn = ({ config, input }) => {
  const tokens = input
    .trim()
    .split(/\s+/)
    .map((token) => token.trim());

  return { config, tokens };
};

export default tokenizer;
