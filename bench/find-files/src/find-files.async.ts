import * as fs from "node:fs/promises";
import * as path from "node:path";

export default async function findFiles(
    baseDir: string,
    glob: RegExp
): Promise<string[]> {
    const results: string[] = [];
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
                results.push(fullPath);
            }
        });

        await Promise.all(tasks);
    }

    return results;
}
