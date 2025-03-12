import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findFilesAsync from './src/find-files.async.ts';
import findFilesSync from './src/find-files.sync.ts';
import {countFiles} from "../../src/lib/file-system.ts";
import {FLAT_100_TEST_DIR} from "../../src/lib/constants.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', FLAT_100_TEST_DIR);
const count = countFiles(fixtureDir);

const glob = /.js/g;

summary(() => {
    compact(() => {
        group(`find files; count: ${count}; glob: ${glob}`, () => {
            bench('sync', () => {
                if (findFilesSync(fixtureDir, glob).length === 0) {
                    throw new Error('No hits found. Bench invalid.');
                }
            }).gc('inner');

            bench('async', async () => {
                if ((await findFilesAsync(fixtureDir, glob)).length === 0) {
                    throw new Error('No hits found. Bench invalid.');
                }
            }).gc('inner');

        })
    })
})


await run({
    throw: true,
});
