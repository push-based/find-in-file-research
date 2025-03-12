import * as fs from "node:fs";

export default function accessContent(filePath: string): void {
    const content = fs.readFileSync(filePath, "utf8");
    content.split("\n")
        .forEach(line => (line === 'not-in-file'));
}
