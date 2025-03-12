import * as fs from "node:fs/promises";
import * as path from "node:path";
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {FileHit} from "../../../src/lib/types.ts";

export default async function findFiles(
    baseDir: string,
    glob: RegExp,
    pattern: RegExp
): Promise<FileHit[]> {
    const results: FileHit[] = [];
    const queue: string[] = [baseDir];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = await fs.readdir(dir, { withFileTypes: true });
        } catch (err) {
            console.error(`Error reading directory ${dir}:`, err);
            continue;
        }

        const tasks = entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)) {
                results.push(...(findInFile(fullPath, pattern)));
            }
        });

        await Promise.all(tasks);
    }

    return results;
}
