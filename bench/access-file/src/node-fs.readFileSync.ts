import * as fs from "node:fs";

export default function accessFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf8");
}
