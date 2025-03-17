import * as fs from 'fs';
import * as path from 'path';

export function* accessContent(content: string): Generator<string> {
    for (const line of content.split('\n')) {
        yield line;
    }
}

export function getLineHits(content: string, pattern: string, bail = false): LinePosition[] {
    const hits = [];
    let index = content.indexOf(pattern);

    while (index !== -1) {
        hits.push({startColumn: index, endColumn: index + pattern.length});
        if (bail) {
            return hits;
        }
        index = content.indexOf(pattern, index + 1);
    }
    return hits
}



export type LinePosition = {
    startColumn: number;
    endColumn?: number;
};

export type SourcePosition = {
    startLine: number;
    endLine?: number;
} & LinePosition;

export type SourceLocation = {
    file: string,
    position: SourcePosition
};



export async function findInFile(
    file: string,
    searchPattern: string,
    bail = false,
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];
    const content = fs.readFileSync(file, "utf8");
    let startLine = 0;
    for (const line of accessContent(content)) {
        startLine++;
        getLineHits(line, searchPattern, bail).forEach((position) => {
            hits.push({
                file,
                position: {
                    startLine,
                    ...position,
                }
            });
        })
    }
    return hits;
}


export async function findInFiles(
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
            } else if (entry.isFile() && fullPath.match(glob)) {
                for (const result of await findInFile(fullPath, pattern, bail)) {
                    results.push(result);
                }
            }
        }
    }

    return results;
}
