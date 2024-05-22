import tokenizer from "./components/tokenizer";
import transformer from "./components/transformer";
import parser from "./components/parser";
import codeGenerator from "./components/code-generator";
import compose from "./utils/compose";
import promisify from "./utils/promisify";
import type Config from "./types/config";

function tifel(input: string, config?: Config) {
  const converter = compose(codeGenerator, transformer, parser, tokenizer);

  return converter({ config, input });
}

export default tifel;

// function tifelAsync(input: string, config: Config) {
//   return new Promise((resolve, reject) => {
//     try {
//       resolve(tifel(input, config));
//       // compose(resolve, tifel)(input, config)();
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

const tifelAsync = promisify(tifel);

export { tifelAsync };
