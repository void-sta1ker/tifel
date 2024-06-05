import tifel, { tifelAsync } from ".";

const input = `
function log(a) {
  console.log(a);
}

const variable = false ? 1 ? 1 : 2 : true ? 0 : -1;

log(variable);
`;

console.log("\nresult:\n", tifel(input), "\n");

tifelAsync(input).then((output) => console.log(`\nresult async:\n${output}\n`));
