import {globbySync} from 'globby';
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {SourceLocation} from "../../../src/lib/shared/types.ts";


export default async function findInFiles(
    baseDir: string,
    globPatterns: string | string[],
    pattern: string,
    bail = false
): Promise<SourceLocation[]> {
    // Get absolute file paths for all matched files
    const filePaths = globbySync(globPatterns, {cwd: baseDir, absolute: true});

    const results: SourceLocation[] = [];

    for (const filePath of filePaths) {

        for (const match of await findInFile(filePath, pattern, bail)) {
            results.push(match);
            if (bail) {
                return results;
            }
        }
    }

    return results;
}
