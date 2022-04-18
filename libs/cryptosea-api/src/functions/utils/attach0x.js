module.exports = function (hex) {
  if (typeof hex !== "string") return "";
  if (hex[0] === "0" && hex[1] === "x") return hex;
  return "0x" + hex;
};
