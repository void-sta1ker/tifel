function isClient() {
  return typeof window !== "undefined";
}

function serializeObj(obj: object) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "bigint") return value.toString();
    return value;
  });
}

// Hash the serialized object using the Node.js crypto module
async function hashObjectNode(obj: object) {
  const crypto = await import("crypto");
  return crypto.createHash("sha256").update(serializeObj(obj)).digest("hex");
}

// Hash the serialized object using the Web Crypto API
async function hashObjectWeb(obj: object) {
  const serialized = serializeObj(obj);
  const encoder = new TextEncoder();
  const data = encoder.encode(serialized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// export default isClient() ? hashObjectWeb : hashObjectNode;

export default serializeObj;
