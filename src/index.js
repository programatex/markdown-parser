const mainParser = require("./toAst.pegjs");

const toAst = (text) => {
    return mainParser.parse(text);
};

module.exports = {
    toAst
};