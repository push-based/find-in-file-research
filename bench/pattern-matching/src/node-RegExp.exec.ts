import {type LinePosition} from "../../../src/lib/types.ts";

export default function getLineHits(content: string, pattern: RegExp): LinePosition[] {
    const hits = [];
    let match;

    while ((match = pattern.exec(content)) != null) {
        hits.push({startColumn: match.index, endColumn: match.index + match[0].length});
    }
    return hits;
}
