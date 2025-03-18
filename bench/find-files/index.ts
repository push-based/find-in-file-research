import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findFilesAsync from './src/find-files.async.ts';
import findFilesSync from './src/find-files.sync.ts';
import globbySync from './src/globby.ts';
import fastGlob from './src/fast-glob.ts';
import nodeGlob from './src/glob.ts';
import {countFiles} from "../../src/lib/file-system.ts";
import {TEST_FILE_CONFIGURATIONS} from "../../src/lib/constants.ts";
import {runWithConfig} from "../../src/lib/utils.ts";

const ext = '.txt';
const regex = new RegExp(`${ext}$`, 'g')
const globPattern = `**/*${ext}`;

TEST_FILE_CONFIGURATIONS
    .map(({dir}) => dir)
    .forEach((dir) => {
    const fixtureDir = path.join(process.cwd(), 'tmp', dir);
    const count = countFiles(fixtureDir);

    summary(() => {
        compact(() => {
            group(`${dir}; count: ${count}; ext: ${ext}`, () => {
                bench('dir_regex_sync', () => {
                    if (findFilesSync(regex, fixtureDir).length === 0) {
                        throw new Error('No hits found. Bench invalid.');
                    }
                }).gc('inner');

                bench('dir_regex_async', async () => {
                    if ((await findFilesAsync(regex, fixtureDir)).length === 0) {
                        throw new Error('No hits found. Bench invalid.');
                    }
                }).gc('inner');

                bench('globbySync', async () => {
                    if (globbySync(globPattern, fixtureDir).length === 0) {
                        throw new Error('No hits found. Bench invalid.');
                    }
                }).gc('inner');

                bench('fastGlob', async () => {
                    if ((await fastGlob(globPattern, fixtureDir)).length === 0) {
                        throw new Error('No hits found. Bench invalid.');
                    }
                }).gc('inner');

                bench('nodeGlob', async () => {
                    if ((await nodeGlob(globPattern, fixtureDir)).length === 0) {
                        throw new Error('No hits found. Bench invalid.');
                    }
                }).gc('inner');

            })
        })
    })
});
await runWithConfig(run)
