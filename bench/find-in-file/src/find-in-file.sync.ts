import type {FileHit} from "../../../src/lib/types.ts";
import {readFileSync} from "node:fs";
import getLineHits from "./get-hits.ts";

export default function findInFile(
    file: string,
    searchPattern: RegExp,
    bail = false,
): FileHit[] {
    const hits: FileHit[] = [];
    const content = readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        const startLine = index + 1;
        getLineHits(line, searchPattern)
            .forEach(({startColumn, endColumn}) => {
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
