import { compose } from "ramda";
import tokenizer from "./components/tokenizer";
import transformer from "./components/transformer";
import parser from "./components/parser";
import codeGenerator from "./components/code-generator";
import promisify from "./utils/promisify";
import type Config from "./types/config";

function tifel(input: string, config?: Config) {
  const converter = compose(codeGenerator, transformer, parser, tokenizer);

  return converter({ config: config ?? {}, input });
}

const tifelAsync = promisify(tifel);

export { tifelAsync };

export default tifel;
