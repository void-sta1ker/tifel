import Context from "../types/context";

type TraverserFn = (
  arg: Readonly<{
    config: Context["config"];
    ast: Context["newAst"];
    visitor: Context["visitor"];
  }>
) => Context["newAst"];

const traverser: TraverserFn = ({ config, ast, visitor }) => {
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
};

export default traverser;
