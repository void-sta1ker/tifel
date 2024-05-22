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
  type: string;
  children: Node[];
  [key: string]: any;
}

export type { Node };

export default Ast;
