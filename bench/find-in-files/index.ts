import {bench, compact, group, run, summary} from 'mitata';
import * as path from 'node:path';
import findInFilesSync from './src/find-in-files.sync.ts';
import findInFilesAsync from './src/find-in-files.async.ts';
import {countFiles} from "../../src/lib/file-system.ts";
import {NESTED_10_TEST_DIR} from "../../src/lib/constants.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', NESTED_10_TEST_DIR);
const count = countFiles(fixtureDir);

const glob = /.txt/g;

summary(() => {
 // compact(() => {
    group(`find in files; count: ${count}; glob: ${glob}`, () => {
      bench('sync', () => {
        if (findInFilesSync(fixtureDir, glob, /10%/g).length === 0) {
          throw new Error('No hits found. Bench invalid.');
        }
      }).gc('inner');

      bench('async', async () => {
        if ((await findInFilesAsync(fixtureDir, glob, /10%/g)).length === 0) {
          throw new Error('No hits found. Bench invalid.');
        }
      }).gc('inner');

 //   })
  })
})


await run({
  throw: true,
});
