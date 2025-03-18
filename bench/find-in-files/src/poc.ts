import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';


async function fileContainsPattern(
    filePath: string,
    searchPattern: string | RegExp
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
        const rl = readline.createInterface({ input: stream });

        let searchPatternFound = false;

        rl.on('line', (line) => {
            if (
                typeof searchPattern === 'string'
                    ? line.includes(searchPattern)
                    : searchPattern.test(line)
            ) {
                searchPatternFound = true;
                resolve(searchPatternFound);
                rl.close();
                stream.destroy();
            }
        });

        rl.on('close', () => resolve(searchPatternFound));
        rl.on('error', reject);
    });
}

/**
 * Searches for `.ts` files containing the search pattern.
 * @param {string} baseDir - The directory to search.
 * @param {RegExp | string} searchPattern - The pattern to match.
 */
export default async function findInFiles(
    baseDir: string,
    searchPattern: string
) {
    const l = [];
    for await (const filePath of findFiles(baseDir)) {
        if (await fileContainsPattern(filePath, searchPattern)) {
            l.push(path.join(process.cwd(), filePath));
        }
    }
    return l;
}

/**
 * Asynchronously iterates over all `.ts` files in a directory using a queue-based stream-like approach.
 * @param {string} baseDir - The directory to search.
 * @param check
 * @returns {AsyncGenerator<string>} - Yields `.ts` file paths one by one.
 */
export async function* findFiles(
    baseDir: string,
    check: (filePath: string) => boolean = (fullPath) => fullPath.endsWith('.ts')
): AsyncGenerator<string> {
    const queue: string[] = [baseDir];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = await fs.promises.readdir(dir, { withFileTypes: true });
        } catch (err) {
            console.error(`Error reading directory ${dir}:`, err);
            continue;
        }

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && check(fullPath)) {
                yield fullPath;
            }
        }
    }
}
