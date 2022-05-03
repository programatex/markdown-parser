const mainParser = require("./md2ast.pegjs");

const md2ast = (text) => {
  return mainParser.parse(text);
};;

module.exports = {
  md2ast
};