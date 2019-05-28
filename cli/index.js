#!/usr/bin/env node
// require modules
var commandLineArgs = require("command-line-args");
var maker = require("../dist");

// option definitions.
const optionDefinitions = [
    { name: "config", alias: "c", type: String},
    { name: "textfile", alias: "t", type: String },
    { name: "output", alias: "o", type: String, defaultValue: "output" },
]

// parse option from command line args.
const options = commandLineArgs(optionDefinitions);

Promise.resolve()
.then(() => {
    return maker.make({
        fontConfigPath: options.config,
        textFilePath: options.textfile,
        outputFilesPath: options.output,
    });
})
.then(() => {
    console.info("Succeeded to archive the folder.");
    process.exit(0);
})
.catch((err) => {
    console.error(`Failed to archive the folder.`);
    console.error(err);
    process.exit(1);
});

