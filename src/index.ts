import promisify from "./utils/promisify.js";
import tifel from "./tifel.js";

const tifelAsync = promisify(tifel);

export { tifelAsync };

export default tifel;
