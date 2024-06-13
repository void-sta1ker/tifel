import type {
  ArrayExpression,
  AssignmentExpression,
  AssignmentPattern,
  CallExpression,
  ConditionalExpression,
  ExpressionStatement,
  LogicalExpression,
  Property,
  ReturnStatement,
  TemplateLiteral,
  VariableDeclarator,
} from "estree";

type ParentType =
  | VariableDeclarator
  | Property
  | ReturnStatement
  | LogicalExpression
  | AssignmentPattern
  | CallExpression
  | ArrayExpression
  | TemplateLiteral
  | AssignmentExpression
  | ExpressionStatement;

export default function replaceNode(
  parent: ParentType,
  node: CallExpression,
  previousNode: ConditionalExpression
) {
  if (parent.type === "VariableDeclarator") {
    parent.init = node;
    return;
  }

  if (parent.type === "Property") {
    parent.value = node;
    return;
  }

  if (parent.type === "ReturnStatement") {
    parent.argument = node;
    return;
  }

  if (parent.type === "LogicalExpression") {
    if (parent.left.type === "ConditionalExpression") {
      parent.left = node;
      return;
    }

    parent.right = node;
    return;
  }

  if (parent.type === "AssignmentPattern") {
    parent.right = node;
    return;
  }

  if (parent.type === "CallExpression") {
    const index = parent.arguments.findIndex((x) => jsonEqual(x, previousNode));

    if (index !== -1) {
      parent.arguments.splice(index, 1, node);
      return;
    }
  }

  if (parent.type === "ArrayExpression") {
    const index = parent.elements.findIndex(
      (x) => x !== null && jsonEqual(x, previousNode)
    );

    if (index !== -1) {
      parent.elements.splice(index, 1, node);
      return;
    }
  }

  if (parent.type === "TemplateLiteral") {
    const index = parent.expressions.findIndex(
      (x) => x !== null && jsonEqual(x, previousNode)
    );

    if (index !== -1) {
      parent.expressions.splice(index, 1, node);
      return;
    }
  }

  if (parent.type === "AssignmentExpression") {
    parent.right = node;
    return;
  }

  if (parent.type === "ExpressionStatement") {
    parent.expression = node;
    return;
  }
}

function jsonEqual<T extends object>(obj1: T, obj2: T) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
