import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findInFileSync from './src/find-in-file.sync.ts';
import findInFileAsync from './src/find-in-file.async.ts';
import findInFileStream from './src/find-in-file.stream.ts';
import {fileName, runAndSave} from "../../src/lib/utils.ts";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR);
const patterns = [
    /10%/g,
    /50%/g,
    /100%/g
];

LOC_RANGES.forEach((loc) => {
    patterns.forEach((regex) => {

        const targetFile = fileName(fixtureDir, loc);

        summary(() => {
         //   compact(() => {
                group(`find in file; loc: ${loc}; regex: ${regex}`, () => {
                    bench('sync', () => {
                        if ((findInFileSync(targetFile, regex)).length === 0) {
                            throw new Error('No hits found. Bench invalid.')
                        }
                    }).gc('inner');
                    bench('async', async () => {
                        if ((await findInFileAsync(targetFile, regex)).length === 0) {
                            throw new Error('No hits found. Bench invalid.')
                        }
                    }).gc('inner');
                    bench('stream', async () => {
                        if ((await findInFileStream(targetFile, regex)).length === 0) {
                            throw new Error('No hits found. Bench invalid.')
                        }
                    }).gc('inner');
                })
        //    })
        })

    });
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);
await runAndSave(path.join(process.cwd(), '.bench', `${__dirname}-report.json`), () => run({
    throw: true,
    format: 'json',
}));
