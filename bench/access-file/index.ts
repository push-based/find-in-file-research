import * as path from "node:path";
import {bench, compact, do_not_optimize, group, run, summary} from 'mitata';
import {fileName, runWithConfig} from "../../src/lib/utils.ts";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";
import readFileSync from "./src/node-fs.readFileSync.ts";
import readFilePromise from "./src/node-fs.promise.readFile.ts";
import readlineFile from "./src/node-readline.ts";

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
                                do_not_optimize(readFileSync(targetFile));
                        }
                    },
                    {
                        name: 'node:fs/promise.readFile',
                        fn: async () => {
                            do_not_optimize(await readFilePromise(targetFile));
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

await runWithConfig(run)
