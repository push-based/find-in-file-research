import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findInFileSync from '../find-in-file/src/find-in-file.sync.ts';
import findInFileAsync from '../find-in-file/src/find-in-file.async.ts';
import findInFileStream from '../find-in-file/src/find-in-file.stream.ts';
import {fileName, runWithConfig} from "../../src/lib/utils.ts";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR);
const bail = true;
const patterns = [
    '10%',
    '30%',
    '60%',
];

LOC_RANGES.forEach((loc) => {
    patterns.forEach((regex) => {

        const targetFile = fileName(fixtureDir, loc);

        summary(() => {
            compact(() => {
                group(`find in file; loc: ${loc}; regex: ${regex}`, () => {
                    bench('sync', async () => {
                        if ((await findInFileSync(targetFile, regex, bail)).length === 0) {
                            throw new Error('No hits found. Bench invalid.')
                        }
                    }).gc('inner');
                    bench('async', async () => {
                        if ((await findInFileAsync(targetFile, regex, bail)).length === 0) {
                            throw new Error('No hits found. Bench invalid.')
                        }
                    }).gc('inner');
                    bench('stream', async () => {
                        if ((await findInFileStream(targetFile, regex, bail)).length === 0) {
                            throw new Error('No hits found. Bench invalid.')
                        }
                    }).gc('inner');
                })

            })
        })
    })

});

await runWithConfig(run)
