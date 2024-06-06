function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

export default function deepEqual<T extends Object>(
  obj1: Object,
  obj2: Object
) {
  if (obj1 === obj2) {
    // Handles same reference and same value for primitives
    return true;
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    // If either is not an object (or is null), they are not equal
    return false;
  }

  // Compare their keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    // If key is not present in obj2 or their values are not equal
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
