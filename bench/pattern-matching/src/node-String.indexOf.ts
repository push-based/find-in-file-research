import {type LinePosition} from "../../../src/lib/shared/types.ts";

export default function getLineHits(content: string, pattern: string, bail = false): LinePosition[] {
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
