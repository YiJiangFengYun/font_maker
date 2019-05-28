// require modules
import * as os from "os";
import * as path from "path";
import * as childProcess from "child_process";
import { log } from './logger';


export interface MakerInfo {
    fontConfigPath: string
    textFilePath: string;
    outputFilesPath: string;
}

export function make(info: MakerInfo) {
    return new Promise<void>((resolve, reject) => {
        log.info(`Making font files with param info ${JSON.stringify(info)}`);
        let plat = os.platform();
        let exePath = path.join(__dirname, "..", "bin", plat, "bmfont64");
        if (plat === "win32") {
            exePath += ".exe";
        }
        let childProc = childProcess.spawn(
            exePath, 
            [
                "-c", 
                path.join(process.cwd(), info.fontConfigPath), 
                "-t", 
                path.join(process.cwd(), info.textFilePath),
                "-o", 
                path.join(process.cwd(), info.outputFilesPath),
            ],
            {
                stdio: "inherit", 
                windowsHide: true,
            }
        );
        childProc.once("exit", (code) => {
            if (code) {
                reject(`Failed to make font files with param info ${JSON.stringify(info)}`);
            } else {
                log.info(`Succeeded to make font files with param info ${JSON.stringify(info)}`);
                resolve();
            }
        });
        childProc.on("error", (err) => {
            log.error(err);
        });
    });
}