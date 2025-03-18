import {generateTestFiles, setupLocFiles} from "./lib/utils.ts";
import * as path from "node:path";
import {TEST_FILE_CONFIGURATIONS, VOLUME_TEST_DIR} from "./lib/constants.ts";


await setupLocFiles(path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR));
console.log(`✅ loc-files folder created successfully in "${VOLUME_TEST_DIR}"`);

TEST_FILE_CONFIGURATIONS.forEach(async ({dir, opt}) => {
    await generateTestFiles(path.join(process.cwd(), 'tmp', dir), opt);
    await generateTestFiles(path.join(process.cwd(), 'tmp', dir), {...opt, ext: 'mjs'});
    await generateTestFiles(path.join(process.cwd(), 'tmp', dir), {...opt, ext: 'ts'});
    console.log(`✅ Files created successfully in "${dir}" for ext 'txt', 'mjs', 'ts'`);
})
