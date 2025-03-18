import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findInFilesPoc from './src/poc.ts';
import findInFilesSync from './src/find-in-files.sync.ts';
import findInFilesAsync from './src/find-in-files.async.ts';
import findInFilesGlobby from './src/find-in-files.globby.sync.ts';
import {countFiles} from "../../src/lib/file-system.ts";
import {TEST_FILE_CONFIGURATIONS} from "../../src/lib/constants.ts";
import {runWithConfig} from "../../src/lib/utils.ts";

const ext = '.txt';
const regex = new RegExp('file_[0-9]*' + ext + '$', 'g');
const glob = `**/file_[0-9]*${ext}`;

const resultMap = Object.fromEntries(TEST_FILE_CONFIGURATIONS
    .map(({dir}) => {
        if (dir.match('dir-0')) {
            if (dir.match('file-100000')) {
                return [dir,    70780];
            }
            if (dir.match('file-10000')) {
                return [dir,    100000];
            }
            if (dir.match('file-1000')) {
                return [dir, 10000];
            }
            if (dir.match('file-100')) {
                return [dir, 1000];
            }
            if (dir.match('file-10')) {
                return [dir, 100];
            }
            return [dir, 10];
        }
        if (dir.match('dir-3-file-10-nest-3-loc-1000')) {
            return [dir, 4000];
        }
        if (dir.match('dir-3-file-10-nest-6-loc-1000')) {
            return [dir, 109300];
        }
        return [dir, 10];
    }))

TEST_FILE_CONFIGURATIONS
    .filter(({dir}) => dir.match('dir-0'))
    .map(({dir}) => dir)
    .forEach((dir) => {
        const fixtureDir = path.join(process.cwd(), 'tmp', dir);
        const count = countFiles(fixtureDir);

        summary(() => {
            compact(() => {
                group(`${dir}; count: ${count}; glob: ${glob}`, () => {

                    /*bench('findInFiles PoC', async () => {
                        const result = await findInFilesPoc(fixtureDir, '10%');
                        if (result.length !== resultMap[dir]) {
                            throw new Error(dir + ' results: ' + result.length);
                        }
                    }).gc('inner'); */

                    bench('sync generator + dir globby', async () => {
                        const result = await findInFilesGlobby(fixtureDir, glob, '10%');
                        if (result.length !== resultMap[dir]) {
                            throw new Error(dir + ' results: ' + result.length);
                        }
                    }).gc('inner');

                    bench('sync generator + dir regex', async () => {
                        if ((await findInFilesSync(fixtureDir, regex, '10%')).length === 0) {
                            throw new Error('No hits found. Bench invalid.');
                        }
                    }).gc('inner');

                    bench('async generator + dir regex', async () => {
                        if ((await findInFilesAsync(fixtureDir, regex, '10%')).length === 0) {
                            throw new Error('No hits found. Bench invalid.');
                        }
                    }).gc('inner');

                    /*
                    // @note: too slow
                      bench('fastFindInFiles', async () => {
                          if ((await fastFindInFiles(fixtureDir, '10%')).length === 0) {
                              throw new Error('No hits found. Bench invalid.');
                          }
                      }).gc('inner');
                    */
                })
            })
        })
    })

await runWithConfig(run);

