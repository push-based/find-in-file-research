import {type LinePosition} from "../../../src/lib/types.ts";

export default function getLineHits(content: string, pattern: string): LinePosition[] {
    const hits = [];
    let index = content.indexOf(pattern);

    while (index !== -1) {
        hits.push({startColumn: index, endColumn: index + pattern.length});
        index = content.indexOf(pattern, index + 1);
    }
    return hits
}
