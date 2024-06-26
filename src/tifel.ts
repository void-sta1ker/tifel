import { type ConditionalExpression } from "estree";
import { parse } from "acorn";
import { ancestor as walk } from "acorn-walk";
import escodegen from "escodegen";
import { inspect } from "util";
import ternaryToIfElse from "./transformers/ternary-to-if-else.js";
import findRight from "./utils/find-right.js";
import hashObject from "./utils/hash-object.js";
import replaceChild from "./utils/replace-child.js";
import type Config from "./types/config.js";

function tifel(input: string, config?: Config) {
  const map = new Map<string, boolean>();

  const parsed = parse(input, {
    ecmaVersion: "latest",
    sourceType: "module",
  });

  const ast = structuredClone(parsed);

  walk(ast, {
    ConditionalExpression(node, _, ancestors) {
      const parent = findRight(
        ancestors,
        (x) => x.type !== "ConditionalExpression"
      );

      if (parent) {
        const id = hashObject(parent);

        // MUTATION
        if (!map.has(id)) {
          const anonFn = ternaryToIfElse(node as ConditionalExpression) ?? [];

          replaceChild(parent, anonFn, node);

          map.set(id, true);
        }
      }
    },
  });

  map.clear();

  // console.log(inspect(ast, { showHidden: true, depth: null }));

  const code = escodegen
    .generate(ast, { format: { compact: false } })
    .replace("\n;\n", "\n\n");

  return code;
}

export default tifel;
