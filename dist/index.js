"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require modules
var fsExtra = require("fs-extra");
var path = require("path");
var init_1 = require("./init");
var maker = require("./maker");
function make(info) {
    return init_1.init()
        .then(function () {
        //Ensure the directory of output existing
        return fsExtra.ensureDir(path.dirname(info.outputFilesPath));
    })
        .then(function () {
        return maker.make(info);
    });
}
exports.make = make;
