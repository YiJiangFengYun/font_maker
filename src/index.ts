// require modules
import * as fsExtra from "fs-extra";
import * as path from "path";
import { init } from "./init";
import * as maker from "./maker";

export function make(info: maker.MakerInfo) {
    return init()
    .then(() => {
        //Ensure the directory of output existing
        return fsExtra.ensureDir(path.dirname(info.outputFilesPath));
    })
    .then(() => {
        return maker.make(info);
    });
}

