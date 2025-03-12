import * as fs from "node:fs/promises";

export default async function accessContent(filePath): Promise<void> {
    const content = await fs.readFile(filePath, "utf8");
    content.split("\n")
        .forEach(line => (line === 'not-in-file'));
}
