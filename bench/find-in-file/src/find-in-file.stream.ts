import type {SourceLocation} from "../../../src/lib/shared/types.ts";
import accessFile from "../../access-file/src/node-readline.ts";
import getLineHits from "../../pattern-matching/src/node-String.indexOf.ts";

export default async function findInFile(
    file: string,
    searchPattern: string,
    bail = false,
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];

    let startLine = 0;
    for await (const line of accessFile(file)) {
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
