import type { Statement } from "acorn";

export default function ternaryToIfElse(node): Statement[] | undefined {
  if (node.type === "VariableDeclaration") {
    const { id } = node.declarations[0];
    const { test, consequent, alternate } = node.declarations[0].init;

    const varDeclaration = {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id,
          init: null,
        },
      ],
      kind: node.kind === "const" ? "let" : node.kind,
    };

    const emptyStatement = {
      type: "EmptyStatement",
    };

    const ifStatement = createIfStatement(id, test, consequent, alternate);

    return [varDeclaration, emptyStatement, ifStatement];
  }
}

function createIfStatement(identifier, test, consequent, alternate) {
  return {
    type: "IfStatement",
    test,
    consequent:
      consequent.type === "ConditionalExpression"
        ? createIfStatement(
            identifier,
            consequent.test,
            consequent.consequent,
            consequent.alternate
          )
        : {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AssignmentExpression",
                  operator: "=",
                  left: identifier,
                  right: consequent,
                },
              },
            ],
          },
    alternate:
      alternate.type === "ConditionalExpression"
        ? createIfStatement(
            identifier,
            alternate.test,
            alternate.consequent,
            alternate.alternate
          )
        : {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AssignmentExpression",
                  operator: "=",
                  left: identifier,
                  right: alternate,
                },
              },
            ],
          },
  };
}
