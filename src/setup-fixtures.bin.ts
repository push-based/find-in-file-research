import {generateTestFiles, setupLocFiles} from "./lib/utils";
import * as path from "node:path";
import {FLAT_100_TEST_DIR, NESTED_10_TEST_DIR, VOLUME_TEST_DIR} from "./lib/constants.ts";

await setupLocFiles(path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR));
console.log(`✅ LOC files created successfully in "${VOLUME_TEST_DIR}"`);

await generateTestFiles(path.join(process.cwd(), 'tmp', NESTED_10_TEST_DIR), {
    filesPerDir: 10,
    levels: 6,
    subDirs: 3,
});
console.log(`✅ NESTED_10_TEST_DIR files created successfully in "${NESTED_10_TEST_DIR}"`);

await generateTestFiles(path.join(process.cwd(), 'tmp', FLAT_100_TEST_DIR), {
    filesPerDir: 100,
    levels: 1,
    subDirs: 0,
});
console.log(`✅ FLAT_100_TEST_DIR files created successfully in "${FLAT_100_TEST_DIR}"`);
