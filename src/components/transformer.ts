import traverser from "./traverser";
import type Context from "../types/context";

type TransformerFn = (
  arg: Readonly<{
    config: Context["config"];
    ast: Context["ast"];
    visitor: Context["visitor"];
  }>
) => {
  config: Context["config"];
  newAst: Context["newAst"];
};

const transformer: TransformerFn = ({ config, ast }) => {
  return {
    config,
    newAst: traverser({ config, ast, visitor: config.visitor }),
  };
};

export default transformer;
