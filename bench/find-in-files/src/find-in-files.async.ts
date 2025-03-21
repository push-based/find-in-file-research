import * as fs from "node:fs/promises";
import * as path from "node:path";
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {SourceLocation} from "../../../src/lib/shared/types.ts";

export default async function findInFilesAsync(
    baseDir: string,
    glob: RegExp,
    pattern: string,
    bail = false
): Promise<SourceLocation[]> {
    const results: SourceLocation[] = [];
    const queue: string[] = [baseDir];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = await fs.readdir(dir, {withFileTypes: true});
        } catch (err) {
            console.error(`Error reading directory ${dir}:`, err);
            continue;
        }

        const tasks = entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)) {
                for (const result of await findInFile(fullPath, pattern, bail)) {
                    results.push(result);
                }
            }
        });

        await Promise.all(tasks);
    }

    return results;
}
