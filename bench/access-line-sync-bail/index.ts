import * as path from "node:path";
import * as fs from "node:fs";
import {bench, compact, type ctx, do_not_optimize, group, run, summary, type trial} from 'mitata';
import {fileName, runWithConfig} from "../../src/lib/utils.ts";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";
import stringSplit from "../access-line-sync/src/node-String.split.ts";
import stringIndexOf from "../access-line-sync/src/node-String.indexOf.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR);
const patterns = [
    '- 10%',
    '- 30%',
    '- 50%',
    '- 70%'
];

LOC_RANGES.forEach((loc) => {
    patterns.forEach((pattern) => {
        const content = fs.readFileSync(fileName(fixtureDir, loc)).toString();
        group(`content access sync bail; loc: ${loc}; patterns: ${pattern}`, () => {
            summary(() => {
                compact(() => {
                    [
                        {
                            name: 'node:String.split',
                            fn: () => {
                                for (const line of stringSplit(content)) {
                                    do_not_optimize(line);
                                    if (line.startsWith(pattern)) break;
                                }
                            }
                        },
                        {
                            name: 'node:String.indexOf',
                            fn: async () => {
                                for await (const line of stringIndexOf(content)) {
                                    do_not_optimize(line);
                                    if (line.startsWith(pattern)) break;
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
});

await runWithConfig(run)
