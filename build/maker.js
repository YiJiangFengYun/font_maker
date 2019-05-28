"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require modules
var os = require("os");
var path = require("path");
var childProcess = require("child_process");
var logger_1 = require("./logger");
function make(info) {
    return new Promise(function (resolve, reject) {
        logger_1.log.info("Making font files with param info " + JSON.stringify(info));
        var plat = os.platform();
        var exePath = path.join(__dirname, "..", "bin", plat, "bmfont64");
        if (plat === "win32") {
            exePath += ".exe";
        }
        var childProc = childProcess.spawn(exePath, [
            "-c",
            path.join(process.cwd(), info.fontConfigPath),
            "-t",
            path.join(process.cwd(), info.textFilePath),
            "-o",
            path.join(process.cwd(), info.outputFilesPath),
        ], {
            stdio: "inherit",
            windowsHide: true,
        });
        childProc.once("exit", function (code) {
            if (code) {
                reject("Failed to make font files with param info " + JSON.stringify(info));
            }
            else {
                logger_1.log.info("Succeeded to make font files with param info " + JSON.stringify(info));
                resolve();
            }
        });
        childProc.on("error", function (err) {
            logger_1.log.error(err);
        });
    });
}
exports.make = make;
//# sourceMappingURL=maker.js.map