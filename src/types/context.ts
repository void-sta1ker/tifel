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

type TokenizerFn = (
  arg: Readonly<{
    config: Context["config"];
    input: Context["input"];
  }>
) => { config: Context["config"]; tokens: Context["tokens"] };

type ParserFn = (
  arg: Readonly<{
    config: Context["config"];
    tokens: Context["tokens"];
  }>
) => {
  config: Context["config"];
  ast: Context["ast"];
};

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

type CodeGeneratorFn = (
  arg: Readonly<{
    config: Context["config"];
    ast: Context["newAst"];
  }>
) => Context["output"];

export { TokenizerFn, ParserFn, TransformerFn, CodeGeneratorFn };
