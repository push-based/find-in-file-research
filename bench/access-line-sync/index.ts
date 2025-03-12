import * as path from "node:path";
import * as fs from "node:fs";
import {bench, compact, do_not_optimize, group, run, summary} from 'mitata';
import {fileName, runAndSave} from "../../src/lib/utils.ts";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";
import stringSplit from "./src/node-String.split.ts";
import stringIndexOf from "./src/node-String.indexOf.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR);

LOC_RANGES.forEach((loc) => {
    const content = fs.readFileSync(fileName(fixtureDir, loc)).toString();
    group(`content access sync; loc: ${loc};`, () => {
        summary(() => {
            compact(() => {
                [
                    {
                        name: 'node:String.split',
                        fn: () => {
                            for (const line of stringSplit(content)) {
                                do_not_optimize(line);
                            }
                        }
                    },
                    {
                        name: 'node:String.indexOf',
                        fn: async () => {
                            for await (const line of stringIndexOf(content)) {
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
