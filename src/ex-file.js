const variable = false ? (1 ? 1 : 2) : true ? 0 : -1;

const obj = {
  a: 1 ? 1 : 1,
};

const y = (function () {
  return true ? 1 : 2;
})();

const result = isActive && (age > 18 ? "Adult" : "Minor");

function greet(name = isGuest ? "Guest" : "User", a = 1 ? 1 : 1) {
  return 1;
}

console.log(1, isActive ? "Active" : "Inactive", 2);

const statuses = [isActive ? "Active" : "Inactive", "Pending"];

let abcd;
abcd = true ? 1 : 0;
