import * as fs from "node:fs";

export default function* accessContent(filePath: string, bail = false): Generator<string> {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    for (const line of lines) {
        yield line;
    }
}
