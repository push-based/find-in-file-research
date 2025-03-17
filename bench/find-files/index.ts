import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findFilesAsync from './src/find-files.async.ts';
import findFilesSync from './src/find-files.sync.ts';
import {countFiles} from "../../src/lib/file-system.ts";
import {FLAT_100_TEST_DIR, DIR_3_FILE_10_NEST_8, DIR_3_FILE_10_NEST_6} from "../../src/lib/constants.ts";
import {runWithConfig} from "../../src/lib/utils.ts";


const glob = /.txt/g;

[FLAT_100_TEST_DIR, DIR_3_FILE_10_NEST_8, DIR_3_FILE_10_NEST_6, '.'].forEach((dir) => {
    const fixtureDir = path.join(process.cwd(), 'tmp', dir);
    const count = countFiles(fixtureDir);

    summary(() => {
        compact(() => {
            group(`${dir}; count: ${count}; glob: ${glob}`, () => {
                bench('sync', () => {
                    if (findFilesSync(fixtureDir, glob).length !== count) {
                        throw new Error('No hits found. Bench invalid.');
                    }
                }).gc('inner');

                bench('async', async () => {
                    if ((await findFilesAsync(fixtureDir, glob)).length !== count) {
                        throw new Error('No hits found. Bench invalid.');
                    }
                }).gc('inner');

            })
        })
    })
});
await runWithConfig(run)
