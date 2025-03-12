import * as fs from "node:fs";
import * as readline from "node:readline";

export default async function accessContent(filePath: string): Promise<void> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({input: stream});
    for await (const line of rl) {
        line === 'not-in-file';
    }
}
