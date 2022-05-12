#!/usr/bin/env node

try {
    require("yargs")
        .scriptName("stencil")
        .usage("$0 <command> [args]")
        .command("trace <pattern> <location>", "Generate a file from a template", yargs => {
            yargs.positional("pattern", {
                type: "string",
                describe: "The pattern template to generate."
            })
            yargs.positional("location", {
                type: "string",
                describe: "The location to generate the file."
            })
        }, require("./commands/trace"))
        .command("install <pattern> [name]", "Install a pattern from either a file or a URL", yargs => {
            yargs.positional("pattern", {
                type: "string",
                describe: "The pattern to install. Can be a filepath or a URL."
            })
            yargs.positional("name", {
                type: "string",
                describe: "The name to save the pattern as. If not provided, the pattern will be saved as the filename.",
                default: null
            })
        }, require("./commands/install"))
        .command("list", "List all installed patterns", require("./commands/list"))
        .help()
        .argv;
} catch (e) {
    console.error(`Error: ${e.message}`);
}
