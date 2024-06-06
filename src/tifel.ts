import { type ConditionalExpression } from "estree";
import { type CallExpression, parse } from "acorn";
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
      node.declarations.map(({ id, init }) => {
        if (init?.type === "ConditionalExpression") {
          const anonFn = ternaryToIfElse(init as ConditionalExpression) ?? [];

          ast.body.find((n) => {
            if (n.type === "VariableDeclaration") {
              const declaration = n.declarations.find((d) => d.id === id);
              declaration &&
                declaration.init &&
                (declaration.init = anonFn as CallExpression);
            }
          });
        }
      });
    },
  });

  // console.log(inspect(ast, { showHidden: true, depth: null }));

  const code = escodegen
    .generate(ast, { format: { compact: false } })
    .replace("\n;\n", "\n\n");

  return code;
}

export default tifel;
