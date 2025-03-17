import * as fs from "node:fs/promises";

export default function accessFile(filePath: string): Promise<string> {
    return fs.readFile(filePath, "utf8");
}
