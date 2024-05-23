import type Context from "../types/context";

type CodeGeneratorFn = (
  arg: Readonly<{
    config: Context["config"];
    newAst: Context["newAst"];
  }>
) => Context["output"];

const codeGenerator: CodeGeneratorFn = ({ config, newAst }) => {
  return "";
};

export default codeGenerator;
