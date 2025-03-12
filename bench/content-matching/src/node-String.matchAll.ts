import {type LineHit} from "../../../src/lib/types.ts";

export default function getLineHits(content: string, pattern: RegExp): LineHit[] {
    return [...content.matchAll(pattern)].map(
        ({index = 0, 0: match = ''}) => ({
            startColumn: index,
            endColumn: index + match.length,
        })
    );
}
