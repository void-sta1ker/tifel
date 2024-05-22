import curry from "./curry";
import id from "./id";

type Func<T extends any[], R> = (...a: T) => R;

function compose<T extends any[], R>(
  f1: Func<T, R>,
  ...funcs: Array<Func<any, any>>
): Func<T, any> {
  if (funcs.length === 0) {
    return f1;
  }

  return (...args: T): any => {
    return funcs.reduceRight((acc, fn) => fn(acc), f1(...args));
  };
}

const curriedCompose = curry(compose)(id);

export default curriedCompose;
