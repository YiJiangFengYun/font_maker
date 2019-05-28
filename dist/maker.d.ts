export interface MakerInfo {
    fontConfigPath: string;
    textFilePath: string;
    outputFilesPath: string;
}
export declare function make(info: MakerInfo): Promise<void>;
