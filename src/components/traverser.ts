import type Ast from "../types/ast";
import type Config from "../types/config";
import type Visitor from "../types/visitor";

function traverser(config: Config, ast: Ast, visitor: Visitor) {
  function traverseArray(array, parent) {
    array.forEach((node) => traverseNode(node, parent));
  }

  function traverseNode(node, parent) {
    const methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter.call(visitor, node, parent);
    }

    traverseArray(node.children, node);

    if (methods && methods.exit) {
      methods.exit.call(visitor, node, parent);
    }
  }

  traverseNode(ast, null);

  return ast;
}

export default traverser;
