import {generateTestFiles, setupLocFiles} from "./lib/utils";
import * as path from "node:path";
import {FLAT_100_TEST_DIR, DIR_3_FILE_10_NEST_8, DIR_3_FILE_10_NEST_6, VOLUME_TEST_DIR} from "./lib/constants.ts";

await setupLocFiles(path.join(process.cwd(), 'tmp', VOLUME_TEST_DIR));
console.log(`✅ LOC files created successfully in "${VOLUME_TEST_DIR}"`);

await generateTestFiles(path.join(process.cwd(), 'tmp', DIR_3_FILE_10_NEST_6), {
    filesPerDir: 10,
    levels: 6,
    subDirs: 3,
});
console.log(`✅ DIR_3_FILE_10_NEST_6 files created successfully in "${DIR_3_FILE_10_NEST_6}"`);

await generateTestFiles(path.join(process.cwd(), 'tmp', DIR_3_FILE_10_NEST_8), {
    filesPerDir: 10,
    levels: 8,
    subDirs: 3,
});
console.log(`✅ DIR_3_FILE_10_NEST_8 files created successfully in "${DIR_3_FILE_10_NEST_8}"`);

await generateTestFiles(path.join(process.cwd(), 'tmp', FLAT_100_TEST_DIR), {
    filesPerDir: 100,
    levels: 1,
    subDirs: 0,
});
console.log(`✅ FLAT_100_TEST_DIR files created successfully in "${FLAT_100_TEST_DIR}"`);
