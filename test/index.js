let maker = require("../build");

maker.make({
    fontConfigPath: "./test/config.bmfc",
    textFilePath: "./test/text",
    outputFilesPath: "./test/output/output.fnt",
});