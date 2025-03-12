import * as path from "node:path";
import {barplot, bench, group, run, summary} from 'mitata';
import {fileName} from "../../src/lib/utils.ts";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";
import readFileSync from "./src/node-fs.readFileSync.ts";
import readFile from "./src/node-fs.readFileSync.ts";
import readlineFile from "./src/node-readline.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR);

LOC_RANGES.forEach((loc) => {
    const targetFile = fileName(fixtureDir, loc);
    group(`file access; loc: ${loc};`, () => {
        summary(() => {
            barplot(() => {
                bench(`node:fs.readFileSync`,
                    () => readFileSync(targetFile)).gc('inner');
                bench(`node:fs/promise.readFile`,
                    async () => readFile(targetFile)).gc('inner');
                bench(`node:readline`,
                    async () => readlineFile(targetFile)).gc('inner');
            });
        })
    })
});

await run({
    throw: true,
});
