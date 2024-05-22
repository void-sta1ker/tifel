import traverser from "./traverser";
import type Ast from "../types/ast";
import type Config from "../types/config";

function transformer(config: Config, ast: Ast): Ast {
  return ast;
}

export default transformer;
