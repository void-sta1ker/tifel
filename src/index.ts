import promisify from "./utils/promisify";
import tifel from "./tifel";

const tifelAsync = promisify(tifel);

export { tifelAsync };

export default tifel;
