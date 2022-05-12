const { getPatterns } = require("../util")

module.exports = function () {
    const patterns = getPatterns();
    console.log(patterns.join("\t"));
}
