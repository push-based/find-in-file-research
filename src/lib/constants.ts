import {getTestFileConfig} from "./utils.ts";

export const LOC_RANGES = [
    100,
    1000,
    10_000,
    100_000
];

export const VOLUME_TEST_DIR = 'loc-files';

export const TEST_FILE_CONFIGURATIONS = [
    ...[
        10000,
        1000,
        100,
        10
    ].map(filesPerDir => getTestFileConfig({
        filesPerDir,
        levels: 0,
        subDirs: 0,
    })),
    ...[
        3,6
    ].map(levels => getTestFileConfig({
        filesPerDir: 10,
        levels,
        subDirs: 3,
    }))
] as const;

export const README_TEMPLATE = `<!-- START HEADER --><!-- END HEADER -->

Description: TBD

---

## Benchmark Requirements

- TBD

---

<!-- START OVERVIEW -->

<!-- END OVERVIEW -->

---

<!-- START CASES -->

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA --><!-- END DATA -->
`;
