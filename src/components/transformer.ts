import traverser from "./traverser";
import type Context from "../types/context";

type TransformerFn = (
  arg: Readonly<{
    config: Context["config"];
    ast: Context["ast"];
  }>
) => {
  config: Context["config"];
  newAst: Context["newAst"];
};

const transformer: TransformerFn = ({ config, ast }) => {
  return {
    config,
    newAst: traverser({ config, ast, visitor: {} }),
  };
};

export default transformer;
