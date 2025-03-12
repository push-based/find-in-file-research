import type {SourceLocation} from "../../../src/lib/types.ts";
import {readFile} from "node:fs/promises";
import getLineHits from "./get-hits.ts";

export default async function findInFile(
    file: string,
    searchPattern: RegExp,
    bail = false,
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];
    const content = await readFile(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        const startLine = index + 1;
        const matches = getLineHits(line, searchPattern);

        matches.forEach(({startColumn, endColumn}) => {
            hits.push({
                file,
                position: {
                    startLine,
                    startColumn,
                    endLine: startLine,
                    endColumn,
                }
            });
            if (bail) {
                return hits;
            }
        });
    });

    return hits;
}
