import type Context from "../types/context";
import { WHITESPACE } from "../utils/constants";

type TokenizerFn = (
  arg: Readonly<{
    config: Context["config"];
    input: Context["input"];
  }>
) => { config: Context["config"]; tokens: Context["tokens"] };

const tokenizer: TokenizerFn = ({ config, input }) => {
  const tokens = input.split(WHITESPACE).map((token) => token);

  console.log("tokens: ", tokens);

  return { config, tokens };
};

export default tokenizer;
