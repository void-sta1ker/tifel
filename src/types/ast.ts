interface Node {
  type: string;
  value: string;
  loc: {
    start: {
      line: number;
      column: number;
    };
    end: {
      line: number;
      column: number;
    };
  };
  [key: string]: any;
}

interface Ast {
  type: "Program";
  body: Node[];
}

interface CallExpression extends Node {
  type: "CallExpression";
  name: string;
  arguments: Node[];
  // callee: Node;
  // parent: Node;
}

export type { Node };

export default Ast;
