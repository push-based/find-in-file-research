import * as fs from 'fs';
import * as path from 'path';
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {SourceLocation} from "../../../src/lib/shared/types.ts";

export default async function findInFiles(
    baseDir: string,
    glob: RegExp,
    pattern: string,
    bail = false
): Promise<SourceLocation[]> {
    const queue: string[] = [baseDir];
    const results: SourceLocation[] = [];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = fs.readdirSync(dir, {withFileTypes: true});
        } catch (error) {
            console.error(`Error reading directory ${dir}:`, error);
            continue;
        }

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)
            ) {
                for (const result of await findInFile(fullPath, pattern, bail)) {
                    results.push(result);
                    if (bail) {
                        return results;
                    }
                }
            }
        }
    }

    return results;
}
