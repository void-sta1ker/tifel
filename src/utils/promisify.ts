type Fn<T, U extends unknown[]> = (...args: U) => T;

function promisify<T, U extends unknown[]>(
  fn: Fn<T, U>
): (...args: U) => Promise<T> {
  return function (...args: U): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        resolve(fn(...args));
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default promisify;
