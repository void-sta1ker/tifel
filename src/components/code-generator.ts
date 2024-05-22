import type Context from "../types/context";

type CodeGeneratorFn = (
  arg: Readonly<{
    config: Context["config"];
    ast: Context["newAst"];
  }>
) => Context["output"];

const codeGenerator: CodeGeneratorFn = ({ config, ast }) => {
  return "";
};

export default codeGenerator;
