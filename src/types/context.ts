import type Ast from "./ast";
import type Config from "./config";
import type Visitor from "./visitor";

interface Context {
  readonly config: Config;
  readonly input: string;
  tokens: string[];
  ast: Ast;
  visitor: Visitor;
  newAst: Ast;
  output: string;
}

export default Context;
