const { isUrl, isExistingFile, savePattern } = require('../util');
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = function (args) {
    if (isUrl(args.pattern)) return installUrl(args.pattern, args.name);
    if (isExistingFile(args.pattern)) return installFile(args.pattern, args.name);

    throw new Error(`${args.pattern} is not a valid pattern.`);
}

async function installUrl(url, name) {
    name = name ?? url.split('/').pop().split('.').shift();

    console.log(`--- Installing new pattern ${name} from url ---`)

    const response = await fetch(url);
    const text = await response.text();

    savePattern(name, text);
}

function installFile(filepath, name) {
    name = name ?? filepath.split('/').pop().split('.').shift();

    console.log(`--- Installing new pattern ${name} from file ---`)

    const text = fs.readFileSync(filepath, 'utf8');

    savePattern(name, text);
}
