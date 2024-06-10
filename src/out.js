const variable = (() => {
  if (false)
    if (1) return 1;
    else return 2;
  else if (true) return 0;
  else return -1;
})();

const obj = {
  a: (() => {
    if (1) return 1;
    else return 1;
  })(),
};

const y = (function () {
  return (() => {
    if (true) return 1;
    else return 2;
  })();
})();

const result =
  isActive &&
  (() => {
    if (age > 18) return "Adult";
    else return "Minor";
  })();

function greet(
  name = (() => {
    if (isGuest) return "Guest";
    else return "User";
  })(),
  a = (() => {
    if (1) return 1;
    else return 1;
  })()
) {
  return 1;
}

console.log(
  1,
  (() => {
    if (isActive) return "Active";
    else return "Inactive";
  })(),
  2
);

const statuses = [
  (() => {
    if (isActive) return "Active";
    else return "Inactive";
  })(),
  "Pending",
];
