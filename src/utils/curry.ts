type CurriedFunction<T extends any[], R> = T extends [infer A, ...infer Rest]
  ? (arg: A) => CurriedFunction<Rest, R>
  : R;

function curry<T extends any[], R>(
  fn: (...args: T) => R
): CurriedFunction<T, R> {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...nextArgs: any[]) => curried(...args, ...nextArgs);
    }
  } as CurriedFunction<T, R>;
}

export default curry;
