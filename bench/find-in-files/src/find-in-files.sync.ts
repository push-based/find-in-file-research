import * as fs from 'fs';
import * as path from 'path';
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {FileHit} from "../../../src/lib/types.ts";

export default function findInFiles(
    baseDir: string,
    glob: RegExp,
    pattern: RegExp,
): FileHit[] {
    const queue: string[] = [baseDir];
    const results: FileHit[] = [];

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
            } else if (entry.isFile() && fullPath.match(glob)) {
                results.push(...findInFile(fullPath, pattern));
            }
        }
    }

    return results;
}
