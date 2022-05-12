const path = require('path');
const fs = require('fs');

const patternsFolder = path.resolve(__dirname, 'patterns');

function isUrl(url) {
    return /^(https?:\/\/)/.test(url);
}

function isExistingFile(filepath) {
    return fs.existsSync(path.resolve(filepath));
}

function savePattern(name, content) {
    const filepath = path.resolve(patternsFolder, name);
    fs.writeFileSync(filepath, content);
}

function getPatterns() {
    return fs.readdirSync(patternsFolder);
}

function getPattern(name) {
    const filepath = path.resolve(patternsFolder, name);
    if (!fs.existsSync(filepath)) return null;
    return fs.readFileSync(filepath, 'utf8');
}

module.exports = { patternsFolder, isUrl, isExistingFile, savePattern, getPatterns, getPattern }
