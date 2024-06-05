import { parse } from "acorn";
import { simple as walk } from "acorn-walk";
import escodegen from "escodegen";
import { inspect } from "util";
import ternaryToIfElse from "./transformers/ternary-to-if-else";
import type Config from "./types/config";

function tifel(input: string, config?: Config) {
  const parsed = parse(input, {
    ecmaVersion: "latest",
    sourceType: "module",
  });

  const ast = structuredClone(parsed);

  walk(ast, {
    VariableDeclaration(node) {
      const newNodes = ternaryToIfElse(node) ?? [];

      ast.body.splice(
        ast.body.findIndex(
          (n) =>
            n.type === "VariableDeclaration" &&
            n?.declarations?.[0]?.id === node.declarations[0].id
        ),
        1,
        ...newNodes
      );
    },
  });

  console.log(inspect(ast, { showHidden: true, depth: null }));

  const code = escodegen
    .generate(ast, { format: { compact: false } })
    .replace("\n;\n", "\n\n");

  return code;
}

export default tifel;
