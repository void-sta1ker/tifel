type Callback<T> = (error: Error | null, result?: T) => void;

function promisify<T>(
  fn: (...args: any[], callback: Callback<T>) => void
): (...args: any[]) => Promise<T> {
  return (...args: any[]): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      fn(...args, (error: Error | null, result?: T) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as T);
        }
      });
    });
  };
}

// Example usage:

// Callback-based function
function exampleCallbackFunction(
  arg: string,
  callback: (error: Error | null, result?: string) => void
): void {
  if (arg === "error") {
    callback(new Error("An error occurred"));
  } else {
    callback(null, `Hello, ${arg}`);
  }
}

// Convert to Promise-based function
const examplePromiseFunction = promisify(exampleCallbackFunction);

// Using the Promise-based function
examplePromiseFunction("world")
  .then((result) => {
    console.log(result); // Output: "Hello, world"
  })
  .catch((error) => {
    console.error(error);
  });

examplePromiseFunction("error")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error); // Output: "Error: An error occurred"
  });
