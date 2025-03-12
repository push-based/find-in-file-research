import * as fs from "node:fs/promises";

export default async function* accessContent(filePath: string, bail = false): AsyncGenerator<string> {
    const content = await fs.readFile(filePath, "utf8");
    let start = 0;

    while (start < content.length) {
        const end = content.indexOf('\n', start);
        if (end === -1) {
            yield content.slice(start); // Yield last line if no newline is found
            break;
        }
        yield content.slice(start, end);
        start = end + 1;
    }
}
