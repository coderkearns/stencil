const { getPattern } = require('../util');
const { parsePattern } = require('../parse');
const fs = require('fs');
const { waitForDebugger } = require('inspector');
const prompt = require('prompt-sync')();

module.exports = function (args) {
    const name = args.pattern;
    const pattern = getPattern(name);

    if (!pattern) {
        throw new Error(`Pattern ${name} does not exist.`);
    }

    console.log(`-- Tracing ${args.pattern} --`);

    const [questions, template] = parsePattern(pattern)

    const questionData = askQuestions(questions)

    const templateData = { ...questionData, file: args.location, name };

    try {
        const rendered = template(templateData);
        fs.writeFileSync(args.location, rendered);
        console.log(`Pattern ${name} traced to ${args.location}`);
    } catch (e) {
        throw new Error(`Tracing Error: ${e.message}`);
    }
}

const questionTypes = {
    string: (question) => prompt(question + " "),
    _default: (question) => prompt(question + " ")
}

function askQuestions(questions) {
    const data = {}
    for (const question of questions) {
        const type = question.extraData.type || 'string';
        const questionFn = questionTypes[type] || questionTypes._default;
        data[question.name] = questionFn(question.question, question.extraData);
    }
    return data;
}
