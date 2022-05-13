const ejs = require('ejs');

function parsePattern(patternString) {
    // If there is front-matter, parse it using parseFrontMatter
    // Otherwise, default to an empty array
    const frontMatter = patternString.match(/^\s*---\s*\n([\s\S]*?)\s*\n---\s*\n/);
    const questions = frontMatter ? parseFrontMatter(frontMatter[1]) : [];
    // The rest is the pattern, parse it as ejs
    const template = ejs.compile(patternString.replace(/^\s*---\s*\n([\s\S]*?)\s*\n---\s*\n/, ''));
    return [questions, template];
}

function parseFrontMatter(frontMatter) {
    // Every line must follow the following convention:
    // name {extraData}: question
    // name is a string that cannot contain spaces
    // extraData is an optional JSON Object
    // question is a string that can contain spaces or any other character
    const lines = frontMatter.split('\n');
    const questions = [];
    for (const line of lines) {
        try {
            const [part1, part2] = line.split(":");
            let [name, extraData] = part1.split(" ");
            if (!name || !part2) continue
            if (!extraData) {
                extraData = {};
            } else {
                extraData = JSON.parse(extraData);
            }
            const question = part2.trim();
            questions.push({ name, extraData, question });
        } catch (e) {
            continue
        }
    }
    return questions;
}

module.exports = { parsePattern, parseFrontMatter };
