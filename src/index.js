const mainParser = require("./toAst.pegjs");
/**
 * 
 * @param {string} text 
 * @returns {import("./..types")}
 */
const toAst = (text) => {
    return mainParser.parse();
};

module.exports = {
    parse
};