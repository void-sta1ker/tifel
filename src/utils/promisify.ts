type Fn<T extends unknown> = (...args: any[]) => T;

function promisify<T>(fn: Fn<T>) {
  return function () {
    return new Promise<T>((resolve, reject) => {
      try {
        resolve(fn(arguments));
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default promisify;
