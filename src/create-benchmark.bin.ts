import * as fs from 'node:fs';
import * as path from 'node:path';
import {gatherBenchData, writeBenchmarksToFile} from "./lib/utils.ts";
import {updateReadme} from "./lib/readme.ts";

/*
import {findInFiles} from "./index.ts";
Test implementation

const res = await findInFiles('tmp/loc-files', /.txt/g, '10%');
console.log(res.at(1));
throw new Error('stop');
*/

const dirs = fs.readdirSync(path.join(process.cwd(), 'bench')).filter((f) => fs.statSync(path.join(process.cwd(), 'bench', f)).isDirectory());
console.log(`✔️ Found ${dirs.length} benchmark folders`);

for (const folder of ['find-in-files']) {
    const benchFile = path.join(process.cwd(), 'bench', folder, 'index.ts');
    await writeBenchmarksToFile(benchFile, {format: 'json'});
    await writeBenchmarksToFile(benchFile);
}


gatherBenchData(dirs).map((b) => {
    const readmePath = path.join(process.cwd(), 'bench', b.folder, 'README.md');
    fs.writeFileSync(readmePath, updateReadme(b.readme, b));
    console.log(`✅️ Wrote readme for ${readmePath}`);
});


