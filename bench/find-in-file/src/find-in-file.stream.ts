import type {SourceLocation} from "../../../src/lib/types.ts";
import {createReadStream} from "node:fs";
import {createInterface} from "node:readline";
import getLineHits from "./get-hits.ts";

export default async function findInFile(
    file: string,
    searchPattern: RegExp,
    bail = true
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];

    return new Promise((resolve, reject) => {
        const stream = createReadStream(file, {encoding: 'utf8'});
        const rl = createInterface({input: stream});
        let startLine = 0;
        let isResolved = false;

        rl.on('line', line => {
            startLine++;
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

                if (bail && !isResolved) {
                    isResolved = true;
                    stream.destroy();
                    resolve(hits);
                }
            });
        });
        rl.once('close', () => {
            if (!isResolved) {
                isResolved = true;
            }
            resolve(hits);
        });

        rl.once('error', error => {
            if (!isResolved) {
                isResolved = true;
                reject(error);
            }
        });
    });
}
