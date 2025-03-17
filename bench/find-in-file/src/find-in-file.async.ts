import type {SourceLocation} from "../../../src/lib/shared/types.ts";
import accessFile from "../../access-file/src/node-fs.promise.readFile.ts";
import accessContent from "../../access-line-sync/src/node-String.split.ts";
import getLineHits from "../../pattern-matching/src/node-String.indexOf.ts";

export default async function findInFile(
    file: string,
    searchPattern: string,
    bail = false,
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];
    const content = await accessFile(file);
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
