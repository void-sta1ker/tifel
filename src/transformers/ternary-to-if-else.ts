import type {
  ConditionalExpression,
  CallExpression,
  IfStatement,
} from "estree";

export default function ternaryToIfElse(node: ConditionalExpression) {
  const anonFn: CallExpression = {
    type: "CallExpression",
    callee: {
      type: "ArrowFunctionExpression",
      expression: false,
      generator: false,
      async: false,
      params: [],
      body: { type: "BlockStatement", body: [createIfStatement(node)] },
    },
    arguments: [],
    optional: false,
  };

  return anonFn;
}

function createIfStatement(node: ConditionalExpression): IfStatement {
  const { test, consequent, alternate } = node;

  return {
    type: "IfStatement",
    test,
    consequent:
      consequent.type === "ConditionalExpression"
        ? createIfStatement(consequent)
        : {
            type: "ReturnStatement",
            argument: consequent,
          },
    alternate:
      alternate.type === "ConditionalExpression"
        ? createIfStatement(alternate)
        : {
            type: "ReturnStatement",
            argument: alternate,
          },
  };
}
