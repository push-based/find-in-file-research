import * as fs from 'fs';
import * as path from 'path';

export default function findFiles(
    baseDir: string,
    glob: RegExp
): string[] {
    const queue: string[] = [baseDir];
    const results: string[] = [];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = fs.readdirSync(dir, { withFileTypes: true });
        } catch (error) {
            console.error(`Error reading directory ${dir}:`, error);
            continue;
        }

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)) {
                results.push(fullPath);
            }
        }
    }

    return results;
}
