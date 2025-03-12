import {barplot, bench, compact, do_not_optimize, group, run, summary} from 'mitata';
import * as fs from "node:fs";
import * as path from "node:path";
import {LOC_RANGES, VOLUME_TEST_DIR} from "../../src/lib/constants.ts";
import {fileName, runAndSave} from "../../src/lib/utils.ts";
import stringIndexOf from "./src/node-String.indexOf.ts";
import stringMatchAll from "./src/node-String.matchAll.ts";
import regExpExec from "./src/node-RegExp.exec.ts";

const fixtureDir = path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR);
const patterns = ['10%', '50%', '100%'];

LOC_RANGES.forEach((loc) => {
    patterns.forEach((pattern) => {
        const regex = new RegExp(pattern, 'g');
        const targetFile = fileName(fixtureDir, loc);
        const content = fs.readFileSync(targetFile, 'utf8');

        group(`content matching; loc: ${loc}; pattern: ${pattern}`, () => {
            summary(() => {
              //  barplot(() => {
                compact(() => {
                    bench(`node:String.indexOf`, function* () {
                        yield () => do_not_optimize(stringIndexOf(content, pattern));
                    }).gc('inner');
                    bench(`node:String.matchAll`, function* () {
                        yield () => do_not_optimize(stringMatchAll(content, regex))}).gc('inner');
                    // RegExp
                    bench(`node:RegExp.exec`, function* () {
                        yield () => do_not_optimize(regExpExec(content, regex))}).gc('inner')
                });
                //});
            })
        })
    })
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);
await runAndSave(path.join(process.cwd(), '.bench', `${__dirname}-report.json`), () => run({
    throw: true,
    format: 'json',
}));

