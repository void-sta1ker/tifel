import crypto from "crypto";

function serializeObj(obj: object) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "bigint") return value.toString();
    return value;
  });
}

export default function hashObject(obj: object) {
  return crypto.createHash("sha256").update(serializeObj(obj)).digest("hex");
}
