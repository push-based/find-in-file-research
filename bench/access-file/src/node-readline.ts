import * as fs from "node:fs";
import * as readline from "node:readline";

export default async function* accessFile(filePath: string): AsyncGenerator<string> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({input: stream});

    try {
        for await (const line of rl) {
            yield line;
        }
    } finally {
        rl.close();
    }
}
