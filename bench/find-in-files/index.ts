import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findInFilesSync from './src/find-in-files.sync.ts';
import findInFilesAsync from './src/find-in-files.async.ts';
import fastFindInFiles from './src/fast-find-in-files.ts';
import {countFiles} from "../../src/lib/file-system.ts";
import {DIR_3_FILE_10_NEST_10} from "../../src/lib/constants.ts";
import {runWithConfig} from "../../src/lib/utils.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', DIR_3_FILE_10_NEST_10);
const count = countFiles(fixtureDir);

const glob = /.txt$/g;

summary(() => {
     compact(() => {
    group(`find in files; count: ${count}; glob: ${glob}`, () => {
        bench('sync', async () => {
            if ((await findInFilesSync(fixtureDir, glob, '10%')).length !== 0) {
                throw new Error('No hits found. Bench invalid.');
            }
        }).gc('inner');

        bench('async', async () => {
            if ((await findInFilesAsync(fixtureDir, glob, '10%')).length === 0) {
                throw new Error('No hits found. Bench invalid.');
            }
        }).gc('inner');


        bench('fastFindInFiles', async () => {
            if ((await fastFindInFiles(fixtureDir, '10%')).length === 0) {
                throw new Error('No hits found. Bench invalid.');
            }
        }).gc('inner');

           })
    })
})

await runWithConfig(run)

