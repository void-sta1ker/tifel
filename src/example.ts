import tifel, { tifelAsync } from ".";

const input = `const a = true ? 1 : 0;`;

console.log("result: ", tifel(input));

// tifelAsync(input).then((output) => console.log(`result async: ${output}`));
