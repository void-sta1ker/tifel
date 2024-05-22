import type Config from "../types/config";
import type Context from "../types/context";

type ParserFn = (
  arg: Readonly<{
    config: Context["config"];
    tokens: Context["tokens"];
  }>
) => {
  config: Context["config"];
  ast: Context["ast"];
};

const parser: ParserFn = ({ config, tokens }) => {
  return { ast: { type: "root", children: [] }, config };
};

export default parser;
