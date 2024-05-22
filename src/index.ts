import tokenizer from "./components/tokenizer";
import transformer from "./components/transformer";
import parser from "./components/parser";
import codeGenerator from "./components/code-generator";
import compose from "./utils/compose";
import curry from "./utils/curry";
import type Config from "./types/config";

// const converter = compose(tokenizer, parser, transformer, codeGenerator);

// const curriedTifel = curry(converter);

function tifel(input: string, config: Config) {
  const curriedTokenizer = curry(tokenizer)(config);
  const curriedParser = curry(parser)(config);
  const curriedTransformer = curry(transformer)(config);
  const curriedCodeGenerator = curry(codeGenerator)(config);

  const converter = compose(
    curriedTokenizer,
    curriedParser,
    curriedTransformer,
    curriedCodeGenerator
  );

  return converter(input);
}

export default tifel;

function tifelAsync(input: string, config: Config) {
  return new Promise((resolve, reject) => {
    try {
      resolve(tifel(input, config));
    } catch (error) {
      reject(error);
    }
  });
}

export { tifelAsync };
