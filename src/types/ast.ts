interface Node {
  type: string;
  start: number;
  end: number;
  [key: string]: any;
}

interface Ast extends Node {
  type: "Program";
  body: Node[];
  sourceType: "script" | "module";
}

interface Expression extends Node {}

interface Statement extends Node {}

interface ConditionalExpression extends Expression {
  type: "ConditionalExpression";
  test: Node;
  consequent: Node;
  alternate: Node;
}

interface Literal extends Node {
  type: "Literal";
  value: string;
  raw: string;
  regex?: { pattern: string; flags: string };
}

interface UnaryExpression extends Expression {
  type: "UnaryExpression";
  operator: string;
  prefix: boolean;
  argument: Node;
}

interface VariableDeclarator extends Node {
  type: "VariableDeclarator";
  id: Node;
  init: Node;
}

interface Identifier extends Node {
  type: "Identifier";
  name: string;
}

interface VariableDeclaration extends Node {
  type: "VariableDeclaration";
  declarations: VariableDeclarator[];
  kind: "var" | "let" | "const";
}

export default Ast;

export type { Node };
