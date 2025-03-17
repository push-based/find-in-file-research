import {type LinePosition} from "../../../src/lib/shared/types.ts";

export default function getLineHits(content: string, pattern: RegExp): LinePosition[] {
    return [...content.matchAll(pattern)].map(
        ({index = 0, 0: match = ''}) => ({
            startColumn: index,
            endColumn: index + match.length,
        })
    );
}
