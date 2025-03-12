import * as path from "node:path";
import {bench, compact, do_not_optimize, group, run, summary} from 'mitata';
import {fileName, runAndSave} from "../../src/lib/utils.ts";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";
import readFileSync from "../access-file/src/node-fs.readFileSync.ts";
import readFilePromise from "../access-file/src/node-fs.promise.readFile.ts";
import readlineFile from "../access-file/src/node-readline.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR);

LOC_RANGES.forEach((loc) => {
    group(`file access; loc: ${loc};`, () => {
        summary(() => {
            compact(() => {
                const targetFile = fileName(fixtureDir, loc);
                [
                    {
                        name: 'node:fs.readFileSync',
                        fn: () => {
                            for (const line of readFileSync(targetFile)) {
                                do_not_optimize(line);
                            }
                        }
                    },
                    {
                        name: 'node:fs/promise.readFile',
                        fn: async () => {
                            for await (const line of readFilePromise(targetFile)) {
                                do_not_optimize(line);
                            }
                        }
                    },
                    {
                        name: 'node:readline',
                        fn: async () => {
                            for await (const line of readlineFile(targetFile)) {
                                do_not_optimize(line);
                            }
                        }
                    }
                ]
                    .forEach(({name, fn}) =>
                        bench(name, fn).gc('inner')
                    );
            });
        });
    });
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);
await runAndSave(path.join(process.cwd(), '.bench', `${__dirname}-report.json`), () => run({
    throw: true,
    format: 'json',
}));
