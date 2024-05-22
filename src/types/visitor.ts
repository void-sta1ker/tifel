interface Visitor {
  [key: string]: (node: any) => any;
}

export default Visitor;
