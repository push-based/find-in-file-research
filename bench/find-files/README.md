<!-- START HEADER -->
# find-files
<!-- END HEADER -->

Description: TBD

---

## Benchmark Requirements

- TBD

---

<!-- START OVERVIEW -->
The  dir_regex_sync benchmark is the fastest.


## dir-0-file-10000-nest-0-loc-1000-l-400; count: 10000; ext: .txt

| alias           | avg (min … max)                                 | p75            | p99            | speed        |
| --------------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **fastGlob**    | 8392807.95 ns/iter (7217041.00 … 9536458.00)    | 9168792.00 ns  | 9454708.00 ns  | 🔥 fastest   |
| globbySync      | 9762438.36 ns/iter (8515959.00 … 11154834.00)   | 10401375.00 ns | 11124209.00 ns | 1.16x slower |
| dir_regex_sync  | 11035639.09 ns/iter (10385583.00 … 12352458.00) | 11076209.00 ns | 12174292.00 ns | 1.31x slower |
| dir_regex_async | 12570340.90 ns/iter (10758958.00 … 13235625.00) | 12970666.00 ns | 13228000.00 ns | 1.50x slower |
| nodeGlob        | 17175945.30 ns/iter (16141292.00 … 19725916.00) | 17388833.00 ns | 18623542.00 ns | 2.05x slower |

## dir-0-file-1000-nest-0-loc-1000-l-400; count: 1000; ext: .txt

| alias              | avg (min … max)                              | p75           | p99           | speed        |
| ------------------ | -------------------------------------------- | ------------- | ------------- | ------------ |
| **dir_regex_sync** | 1060786.10 ns/iter (1020708.00 … 1195458.00) | 1075291.00 ns | 1168875.00 ns | 🔥 fastest   |
| dir_regex_async    | 1163284.27 ns/iter (1097458.00 … 1338916.00) | 1183459.00 ns | 1314333.00 ns | 1.10x slower |
| fastGlob           | 1215233.08 ns/iter (881792.00 … 2185917.00)  | 1310666.00 ns | 1611250.00 ns | 1.15x slower |
| globbySync         | 1277701.15 ns/iter (1040583.00 … 1511666.00) | 1360542.00 ns | 1467083.00 ns | 1.20x slower |
| nodeGlob           | 2418932.08 ns/iter (1859375.00 … 2926875.00) | 2632166.00 ns | 2880666.00 ns | 2.28x slower |

## dir-0-file-100-nest-0-loc-1000-l-400; count: 100; ext: .txt

| alias              | avg (min … max)                           | p75          | p99          | speed        |
| ------------------ | ----------------------------------------- | ------------ | ------------ | ------------ |
| **dir_regex_sync** | 145104.53 ns/iter (134209.00 … 171917.00) | 148750.00 ns | 167416.00 ns | 🔥 fastest   |
| dir_regex_async    | 211722.03 ns/iter (168583.00 … 683833.00) | 211250.00 ns | 557083.00 ns | 1.46x slower |
| fastGlob           | 301810.84 ns/iter (236416.00 … 413125.00) | 317375.00 ns | 374541.00 ns | 2.08x slower |
| globbySync         | 354696.26 ns/iter (293708.00 … 486417.00) | 369166.00 ns | 469750.00 ns | 2.44x slower |
| nodeGlob           | 639697.37 ns/iter (525625.00 … 971458.00) | 671292.00 ns | 800875.00 ns | 4.41x slower |

## dir-0-file-10-nest-0-loc-1000-l-400; count: 10; ext: .txt

| alias              | avg (min … max)                           | p75          | p99          | speed         |
| ------------------ | ----------------------------------------- | ------------ | ------------ | ------------- |
| **dir_regex_sync** | 18391.51 ns/iter (18199.81 … 18806.47)    | 18395.39 ns  | 18513.68 ns  | 🔥 fastest    |
| fastGlob           | 25153.24 ns/iter (24545.43 … 25913.50)    | 25335.86 ns  | 25483.09 ns  | 1.37x slower  |
| globbySync         | 36887.94 ns/iter (35350.76 … 38784.02)    | 37145.50 ns  | 37742.29 ns  | 2.01x slower  |
| dir_regex_async    | 85815.15 ns/iter (71959.00 … 191666.00)   | 89417.00 ns  | 122791.00 ns | 4.67x slower  |
| nodeGlob           | 448865.49 ns/iter (394792.00 … 575500.00) | 458791.00 ns | 554083.00 ns | 24.41x slower |

## dir-3-file-10-nest-3-loc-1000-l-400; count: 400; ext: .txt

| alias              | avg (min … max)                              | p75           | p99           | speed        |
| ------------------ | -------------------------------------------- | ------------- | ------------- | ------------ |
| **dir_regex_sync** | 864700.55 ns/iter (791959.00 … 984708.00)    | 883709.00 ns  | 940292.00 ns  | 🔥 fastest   |
| fastGlob           | 1061563.05 ns/iter (929708.00 … 1244750.00)  | 1096208.00 ns | 1232209.00 ns | 1.23x slower |
| globbySync         | 1260833.64 ns/iter (1161666.00 … 1507042.00) | 1286917.00 ns | 1430583.00 ns | 1.46x slower |
| dir_regex_async    | 1578502.96 ns/iter (1480125.00 … 1808791.00) | 1604792.00 ns | 1767917.00 ns | 1.83x slower |
| nodeGlob           | 2054110.77 ns/iter (1866750.00 … 2264834.00) | 2095417.00 ns | 2228625.00 ns | 2.38x slower |

## dir-3-file-10-nest-6-loc-1000-l-400; count: 10930; ext: .txt

| alias           | avg (min … max)                                 | p75            | p99            | speed        |
| --------------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **fastGlob**    | 23797324.02 ns/iter (22235417.00 … 25402208.00) | 24585083.00 ns | 25100792.00 ns | 🔥 fastest   |
| dir_regex_sync  | 26677232.42 ns/iter (25600166.00 … 28103459.00) | 26894292.00 ns | 27853958.00 ns | 1.12x slower |
| globbySync      | 30041685.17 ns/iter (28814333.00 … 32883166.00) | 30353708.00 ns | 32123959.00 ns | 1.26x slower |
| nodeGlob        | 37429134.77 ns/iter (32527916.00 … 42855084.00) | 38642167.00 ns | 40322792.00 ns | 1.57x slower |
| dir_regex_async | 43763323.65 ns/iter (43194583.00 … 44997083.00) | 43933709.00 ns | 44656541.00 ns | 1.84x slower |

## dir-3-file-10-nest-8-loc-1000-l-400; count: 98410; ext: .txt

| alias           | avg (min … max)                                    | p75             | p99             | speed        |
| --------------- | -------------------------------------------------- | --------------- | --------------- | ------------ |
| **fastGlob**    | 289684632.00 ns/iter (277155916.00 … 309823750.00) | 291365375.00 ns | 303572375.00 ns | 🔥 fastest   |
| dir_regex_sync  | 310830104.00 ns/iter (305202208.00 … 322032375.00) | 313047084.00 ns | 317121458.00 ns | 1.07x slower |
| nodeGlob        | 345726114.50 ns/iter (330586375.00 … 377550542.00) | 353543291.00 ns | 366804459.00 ns | 1.19x slower |
| globbySync      | 354160110.92 ns/iter (342345958.00 … 372808708.00) | 364095916.00 ns | 369121667.00 ns | 1.22x slower |
| dir_regex_async | 452357958.42 ns/iter (445815375.00 … 468082416.00) | 450420000.00 ns | 464348334.00 ns | 1.56x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->
## fast-glob.ts
_[fast-glob.ts](find-files/src)_
```ts
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fastGlob = require('fast-glob');

export default async function findFiles(
    globP: string,
baseDir: string,
): Promise<string[]> {
    return fastGlob.sync(globP, {cwd: baseDir});
}

```

## find-files.async.ts
_[find-files.async.ts](find-files/src)_
```ts
import * as fs from "node:fs/promises";
import * as path from "node:path";

export default async function findFiles(
    glob: RegExp,
    baseDir: string,
): Promise<string[]> {
    const results: string[] = [];
    const queue: string[] = [baseDir];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = await fs.readdir(dir, { withFileTypes: true });
        } catch (err) {
            console.error(`Error reading directory ${dir}:`, err);
            continue;
        }

        const tasks = entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)) {
                results.push(fullPath);
            }
        });

        await Promise.all(tasks);
    }

    return results;
}

```

## find-files.sync.ts
_[find-files.sync.ts](find-files/src)_
```ts
import * as fs from 'fs';
import * as path from 'path';

export default function findFiles(
    glob: RegExp,
    baseDir: string,
): string[] {
    const queue: string[] = [baseDir];
    const results: string[] = [];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = fs.readdirSync(dir, { withFileTypes: true });
        } catch (error) {
            console.error(`Error reading directory ${dir}:`, error);
            continue;
        }

        for (const entry of entries) {

            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)) {
                results.push(fullPath);
            }
        }
    }

    return results;
}

```

## glob.ts
_[glob.ts](find-files/src)_
```ts
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const globSync = require('glob');

export default async function findFiles(
    globP: string,
    baseDir: string,
): Promise<string[]> {
    return globSync.sync(globP, {cwd: baseDir});
}

```

## globby.ts
_[globby.ts](find-files/src)_
```ts

import { globbySync } from 'globby';

export default function findFiles(
    globP: string,
    baseDir: string,
): string[] {
    return globbySync(globP, {cwd: baseDir});
}

```

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.46 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• dir-0-file-10000-nest-0-loc-1000-l-400; count: 10000; ext: .txt
------------------------------------------- -------------------------------
dir_regex_sync                11.49 ms/iter  11.57 ms  11.96 ms ▂▄█▆▄▃▃▂▁▂▂
dir_regex_async               13.13 ms/iter  13.48 ms  13.92 ms ▂▁▁▁▂▂▂▂█▂▁
globbySync                    10.08 ms/iter  10.78 ms  11.23 ms ▄▆▅▁▁▁▂▆█▅▂
fastGlob                       8.63 ms/iter   9.32 ms   9.83 ms ▃██▂▁▁▂▇█▄▂
nodeGlob                      17.19 ms/iter  17.11 ms  21.03 ms ▄█▂▁▁▁▁▁▁▁▁

summary
  fastGlob
   1.17x faster than globbySync
   1.33x faster than dir_regex_sync
   1.52x faster than dir_regex_async
   1.99x faster than nodeGlob

• dir-0-file-1000-nest-0-loc-1000-l-400; count: 1000; ext: .txt
------------------------------------------- -------------------------------
dir_regex_sync                 1.10 ms/iter   1.11 ms   1.20 ms ▁▂██▇▃▂▂▂▁▁
dir_regex_async                1.22 ms/iter   1.25 ms   1.34 ms ▂▃▄▂▅█▅▃▂▂▁
globbySync                     1.31 ms/iter   1.40 ms   1.51 ms ▂▅▅▄▃▅█▆▇▄▂
fastGlob                       1.12 ms/iter   1.20 ms   1.30 ms ▂▅▃▃▅▄▃█▇▄▂
nodeGlob                       2.41 ms/iter   2.64 ms   2.80 ms ▁▅▄▂▂▂▂▄█▅▂

summary
  dir_regex_sync
   1.02x faster than fastGlob
   1.11x faster than dir_regex_async
   1.19x faster than globbySync
   2.18x faster than nodeGlob

• dir-0-file-100-nest-0-loc-1000-l-400; count: 100; ext: .txt
------------------------------------------- -------------------------------
dir_regex_sync               141.39 µs/iter 142.88 µs 171.50 µs ▂█▇▄▂▂▂▂▁▁▁
dir_regex_async              193.11 µs/iter 197.63 µs 230.42 µs ▂█▆▆▄▃▂▂▁▁▁
globbySync                   374.94 µs/iter 394.96 µs 495.08 µs ▂▄▅▆█▅▃▂▁▁▁
fastGlob                     301.99 µs/iter 317.38 µs 424.13 µs ▂▆▇▇█▄▂▂▂▁▁
nodeGlob                     625.50 µs/iter 653.75 µs 751.21 µs ▁▂▅▄▅█▇▄▂▂▁

summary
  dir_regex_sync
   1.37x faster than dir_regex_async
   2.14x faster than fastGlob
   2.65x faster than globbySync
   4.42x faster than nodeGlob

• dir-0-file-10-nest-0-loc-1000-l-400; count: 10; ext: .txt
------------------------------------------- -------------------------------
dir_regex_sync                18.50 µs/iter  18.54 µs  18.64 µs ▃▁▃▃▃▃█▆▃▃▃
dir_regex_async               34.72 µs/iter  34.84 µs  34.92 µs ▃▁▆▃▃█▁▁▃▁▆
globbySync                    37.08 µs/iter  37.51 µs  37.78 µs ▅▁▁▅▁██▅▅█▅
fastGlob                      25.94 µs/iter  26.20 µs  26.34 µs ▅▁▅▁▁▅█▅▁▅▅
nodeGlob                     464.09 µs/iter 473.79 µs 594.29 µs ▁▁▅█▇▃▂▂▂▁▁

summary
  dir_regex_sync
   1.4x faster than fastGlob
   1.88x faster than dir_regex_async
   2x faster than globbySync
   25.08x faster than nodeGlob

• dir-3-file-10-nest-3-loc-1000-l-400; count: 400; ext: .txt
------------------------------------------- -------------------------------
dir_regex_sync               892.27 µs/iter 905.17 µs   1.08 ms ▂▅█▆▃▂▁▁▁▁▁
dir_regex_async                1.62 ms/iter   1.65 ms   1.93 ms ▂▅██▅▃▂▂▁▁▁
globbySync                     1.30 ms/iter   1.32 ms   1.56 ms ▁▄▇█▅▃▂▂▁▁▁
fastGlob                       1.09 ms/iter   1.12 ms   1.31 ms ▂▄▆█▆▃▃▂▂▂▁
nodeGlob                       2.04 ms/iter   2.08 ms   2.30 ms ▁▃▆██▅▂▂▂▂▁

summary
  dir_regex_sync
   1.22x faster than fastGlob
   1.45x faster than globbySync
   1.82x faster than dir_regex_async
   2.29x faster than nodeGlob

• dir-3-file-10-nest-6-loc-1000-l-400; count: 10930; ext: .txt
------------------------------------------- -------------------------------
dir_regex_sync                26.46 ms/iter  26.84 ms  27.97 ms ▃█▅▃▂▄▃▂▁▂▂
dir_regex_async               44.64 ms/iter  45.01 ms  45.50 ms ▂▂▅▃▁█▃▄▃▂▂
globbySync                    30.91 ms/iter  31.36 ms  32.01 ms ▅▂▂▆▂▆██▆▅▂
fastGlob                      23.98 ms/iter  24.80 ms  25.75 ms ▄▅▇█▅▄▄▅▃▄▄
nodeGlob                      37.29 ms/iter  38.46 ms  39.73 ms ▂▂▂▂▂▄█▆▅▆▂

summary
  fastGlob
   1.1x faster than dir_regex_sync
   1.29x faster than globbySync
   1.55x faster than nodeGlob
   1.86x faster than dir_regex_async

• dir-3-file-10-nest-8-loc-1000-l-400; count: 98410; ext: .txt
------------------------------------------- -------------------------------
dir_regex_sync               313.27 ms/iter 320.22 ms 325.26 ms ▅▅██▅▅▁▁█▁▅
dir_regex_async              451.87 ms/iter 454.10 ms 457.42 ms ▃▁▃▁█▃▁▅▁▃▃
globbySync                   349.36 ms/iter 356.62 ms 358.27 ms ▅█▁▅██▁▁▁▅█
fastGlob                     299.09 ms/iter 310.44 ms 314.55 ms ██▁▅▅▁▅▅▁█▅
nodeGlob                     347.26 ms/iter 347.24 ms 363.79 ms ▆█▃▃▆▁▁▃▁▁▃

summary
  fastGlob
   1.05x faster than dir_regex_sync
   1.16x faster than nodeGlob
   1.17x faster than globbySync
   1.51x faster than dir_regex_async

```

<!-- END DATA -->
