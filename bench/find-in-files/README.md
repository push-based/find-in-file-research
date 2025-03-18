<!-- START HEADER -->
# find-in-files
<!-- END HEADER -->

This benchmark explores various techniques available in **Node.js** for efficiently finding patterns within a file.

---

## Benchmark Requirements

- **File matching:** The method should be able to match files based on a glob pattern.
- **Each File:** The method should search for the pattern within each file.
  - **Multiple Matches:** The method must be able to capture multiple matches in the content, if present.
  - **Bailout:** The method should be able to stop searching within a file after the first match if the `bail` flag is set to `true`.
- **Result Format:** The method should return an array of hits, it is possible to derive the following information from each hit:
  - 📄 **File Path:** The path to the file containing the pattern.
  - 📏 **Start Line:** The starting line of the pattern within the content.
  - 📍 **Start Column:** The starting position (column) of the pattern within the content.
  - 📏 **(optional) End Line:** The ending line of the pattern within the content.
  - 📍 **(optional) End Column:** The ending position (column) of the pattern within the content.

Potential result shape:
```ts
 /**
 * Represents the position of a pattern within a line.
 */
export type SourcePosition = {
    startLine: number;
    endLine?: number;
    startColumn: number;
    endColumn?: number;
};

/**
 * Represents the location of a pattern within a file.
 */
export type SourceLocation = {
    /**
     * The path to the file containing the pattern.
     */
    file: string,
    /**
     * The position of the search pattern within the file.
     */
    position: SourcePosition
};
```

---

<!-- START OVERVIEW -->
The  sync generator + dir regex benchmark is the fastest.


## dir-0-file-10000-nest-0-loc-1000-l-400; count: 10000; glob: **/file_[0-9]*.txt

| alias                          | avg (min … max)                                       | p75              | p99              | speed        |
| ------------------------------ | ----------------------------------------------------- | ---------------- | ---------------- | ------------ |
| **sync generator + dir regex** | 2459490701.58 ns/iter (2381238083.00 … 2573007542.00) | 2463524542.00 ns | 2509002667.00 ns | 🔥 fastest   |
| async generator + dir regex    | 2500631288.08 ns/iter (2425313875.00 … 2556074917.00) | 2512137291.00 ns | 2540765875.00 ns | 1.02x slower |
| sync generator + dir globby    | 2541343913.33 ns/iter (2359620917.00 … 3349688208.00) | 2513638500.00 ns | 2535446459.00 ns | 1.03x slower |

## dir-0-file-1000-nest-0-loc-1000-l-400; count: 1000; glob: **/file_[0-9]*.txt

| alias                          | avg (min … max)                                    | p75             | p99             | speed        |
| ------------------------------ | -------------------------------------------------- | --------------- | --------------- | ------------ |
| **sync generator + dir regex** | 246353395.75 ns/iter (242169083.00 … 249798417.00) | 247863625.00 ns | 248634541.00 ns | 🔥 fastest   |
| async generator + dir regex    | 247330024.33 ns/iter (243480292.00 … 253323125.00) | 248034083.00 ns | 251851833.00 ns | 1.00x slower |
| sync generator + dir globby    | 250722812.42 ns/iter (237498875.00 … 280895500.00) | 251800041.00 ns | 256440250.00 ns | 1.02x slower |

## dir-0-file-100-nest-0-loc-1000-l-400; count: 100; glob: **/file_[0-9]*.txt

| alias                          | avg (min … max)                                 | p75            | p99            | speed        |
| ------------------------------ | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync generator + dir regex** | 24735696.00 ns/iter (22698125.00 … 26135125.00) | 25185750.00 ns | 25939208.00 ns | 🔥 fastest   |
| sync generator + dir globby    | 24898677.57 ns/iter (22948458.00 … 26883000.00) | 25538500.00 ns | 26421083.00 ns | 1.01x slower |
| async generator + dir regex    | 25021457.59 ns/iter (23587000.00 … 27241042.00) | 25311750.00 ns | 27109334.00 ns | 1.01x slower |

## dir-0-file-10-nest-0-loc-1000-l-400; count: 10; glob: **/file_[0-9]*.txt

| alias                          | avg (min … max)                              | p75           | p99           | speed        |
| ------------------------------ | -------------------------------------------- | ------------- | ------------- | ------------ |
| **sync generator + dir regex** | 2516434.06 ns/iter (2271375.00 … 2912875.00) | 2599208.00 ns | 2767667.00 ns | 🔥 fastest   |
| async generator + dir regex    | 2594183.28 ns/iter (2234875.00 … 3017417.00) | 2734958.00 ns | 2953708.00 ns | 1.03x slower |
| sync generator + dir globby    | 2787720.24 ns/iter (2568250.00 … 3242083.00) | 2875959.00 ns | 3082375.00 ns | 1.11x slower |

## dir-3-file-10-nest-3-loc-1000-l-400; count: 1180; glob: **/file_[0-9]*.txt

| alias                          | avg (min … max)                                    | p75             | p99             | speed        |
| ------------------------------ | -------------------------------------------------- | --------------- | --------------- | ------------ |
| **sync generator + dir regex** | 99484195.90 ns/iter (97909083.00 … 100768792.00)   | 99833333.00 ns  | 100416334.00 ns | 🔥 fastest   |
| sync generator + dir globby    | 100039133.30 ns/iter (95831000.00 … 103941500.00)  | 101424375.00 ns | 102131083.00 ns | 1.01x slower |
| async generator + dir regex    | 101394804.00 ns/iter (100386916.00 … 102983000.00) | 101338875.00 ns | 102962166.00 ns | 1.02x slower |

## dir-3-file-10-nest-6-loc-1000-l-400; count: 32770; glob: **/file_[0-9]*.txt

| alias                          | avg (min … max)                                       | p75              | p99              | speed        |
| ------------------------------ | ----------------------------------------------------- | ---------------- | ---------------- | ------------ |
| **sync generator + dir regex** | 2792778201.08 ns/iter (2744331959.00 … 2900717291.00) | 2809293208.00 ns | 2833738375.00 ns | 🔥 fastest   |
| async generator + dir regex    | 2863397770.83 ns/iter (2823073917.00 … 2938205417.00) | 2874066458.00 ns | 2913156625.00 ns | 1.03x slower |
| sync generator + dir globby    | 2987521163.17 ns/iter (2686594000.00 … 5365234917.00) | 2815883833.00 ns | 2893300291.00 ns | 1.07x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->
## fast-find-in-files.ts
_[fast-find-in-files.ts](find-in-files/src)_
```ts
import {type FastFindInFiles, fastFindInFiles} from 'fast-find-in-files';

export default async function findInFiles(directory: string, needle: string): Promise<FastFindInFiles[]> {
    return fastFindInFiles({
        directory,
        needle
    });
}

```

## find-in-files.async.ts
_[find-in-files.async.ts](find-in-files/src)_
```ts
import * as fs from "node:fs/promises";
import * as path from "node:path";
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {SourceLocation} from "../../../src/lib/shared/types.ts";

export default async function findInFilesAsync(
    baseDir: string,
    glob: RegExp,
    pattern: string,
    bail = false
): Promise<SourceLocation[]> {
    const results: SourceLocation[] = [];
    const queue: string[] = [baseDir];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = await fs.readdir(dir, {withFileTypes: true});
        } catch (err) {
            console.error(`Error reading directory ${dir}:`, err);
            continue;
        }

        const tasks = entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)) {
                for (const result of await findInFile(fullPath, pattern, bail)) {
                    results.push(result);
                }
            }
        });

        await Promise.all(tasks);
    }

    return results;
}

```

## find-in-files.fast-glob.sync.ts
_[find-in-files.fast-glob.sync.ts](find-in-files/src)_
```ts
import {globbySync} from 'globby';
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {SourceLocation} from "../../../src/lib/shared/types.ts";


export default async function findInFiles(
    baseDir: string,
    globPatterns: string | string[],
    pattern: string,
    bail = false
): Promise<SourceLocation[]> {
    // Get absolute file paths for all matched files
    const filePaths = globbySync(globPatterns, {cwd: baseDir, absolute: true});

    const results: SourceLocation[] = [];

    for (const filePath of filePaths) {

        for (const match of await findInFile(filePath, pattern, bail)) {
            results.push(match);
            if (bail) {
                return results;
            }
        }
    }

    return results;
}

```

## find-in-files.globby.sync.ts
_[find-in-files.globby.sync.ts](find-in-files/src)_
```ts
import {globbySync} from 'globby';
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {SourceLocation} from "../../../src/lib/shared/types.ts";


export default async function findInFiles(
    baseDir: string,
    globPatterns: string | string[],
    pattern: string,
    bail = false
): Promise<SourceLocation[]> {
    // Get absolute file paths for all matched files
    const filePaths = globbySync(globPatterns, {cwd: baseDir, absolute: true});

    const results: SourceLocation[] = [];

    for (const filePath of filePaths) {

        for (const match of await findInFile(filePath, pattern, bail)) {
            results.push(match);
            if (bail) {
                return results;
            }
        }
    }

    return results;
}

```

## find-in-files.sync.ts
_[find-in-files.sync.ts](find-in-files/src)_
```ts
import * as fs from 'fs';
import * as path from 'path';
import findInFile from "../../find-in-file/src/find-in-file.sync.ts";
import type {SourceLocation} from "../../../src/lib/shared/types.ts";

export default async function findInFiles(
    baseDir: string,
    glob: RegExp,
    pattern: string,
    bail = false
): Promise<SourceLocation[]> {
    const queue: string[] = [baseDir];
    const results: SourceLocation[] = [];

    while (queue.length > 0) {
        const dir = queue.shift()!;

        let entries;
        try {
            entries = fs.readdirSync(dir, {withFileTypes: true});
        } catch (error) {
            console.error(`Error reading directory ${dir}:`, error);
            continue;
        }

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                queue.push(fullPath);
            } else if (entry.isFile() && fullPath.match(glob)
            ) {
                for (const result of await findInFile(fullPath, pattern, bail)) {
                    results.push(result);
                    if (bail) {
                        return results;
                    }
                }
            }
        }
    }

    return results;
}

```

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.36 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• dir-0-file-10000-nest-0-loc-1000-l-400; count: 10000; glob: **/file_[0-9]*.txt
------------------------------------------- -------------------------------
sync generator + dir globby     2.63 s/iter    2.47 s    2.54 s ▃▁▁▆▃█▁▃▁▁▃
sync generator + dir regex      2.44 s/iter    2.45 s    2.47 s ▃▁▃▁▁▁█▅▃▃▃
async generator + dir regex     2.50 s/iter    2.51 s    2.52 s ▃▁▁█▃▃▃▁▃▆▃

summary
  sync generator + dir regex
   1.02x faster than async generator + dir regex
   1.08x faster than sync generator + dir globby

• dir-0-file-1000-nest-0-loc-1000-l-400; count: 1000; glob: **/file_[0-9]*.txt
------------------------------------------- -------------------------------
sync generator + dir globby  242.63 ms/iter 244.25 ms 246.80 ms ▃▁▃▃▁█▆▃▃▁▃
sync generator + dir regex   242.00 ms/iter 243.43 ms 244.89 ms ▃▆▁█▃▁▁▆▁▃▃
async generator + dir regex  244.29 ms/iter 244.55 ms 247.90 ms ▃▁▆▃█▃▆▁▁▁▃

summary
  sync generator + dir regex
   1x faster than sync generator + dir globby
   1.01x faster than async generator + dir regex

• dir-0-file-100-nest-0-loc-1000-l-400; count: 100; glob: **/file_[0-9]*.txt
------------------------------------------- -------------------------------
sync generator + dir globby   24.47 ms/iter  24.86 ms  25.75 ms ▂▁▂▄▅▄█▅▄▃▂
sync generator + dir regex    24.55 ms/iter  25.21 ms  25.91 ms ▄▄▃▄▅█▇▄▇▄▃
async generator + dir regex   25.40 ms/iter  25.87 ms  26.30 ms ▄█▄▄█▂▆▅▅▆▃

summary
  sync generator + dir globby
   1x faster than sync generator + dir regex
   1.04x faster than async generator + dir regex

• dir-0-file-10-nest-0-loc-1000-l-400; count: 10; glob: **/file_[0-9]*.txt
------------------------------------------- -------------------------------
sync generator + dir globby    2.78 ms/iter   2.86 ms   3.18 ms ▁▃▅██▇▅▃▂▂▁
sync generator + dir regex     2.34 ms/iter   2.37 ms   2.65 ms ▃▅█▇▆▃▂▁▁▁▁
async generator + dir regex    2.54 ms/iter   2.66 ms   2.85 ms ▃▅▄▄▆▅█▆▆▄▂

summary
  sync generator + dir regex
   1.09x faster than async generator + dir regex
   1.19x faster than sync generator + dir globby

• dir-3-file-10-nest-3-loc-1000-l-400; count: 1180; glob: **/file_[0-9]*.txt
------------------------------------------- -------------------------------
sync generator + dir globby   99.75 ms/iter 100.06 ms 100.36 ms ▅▁▁▅▅▁▅▅█▅▅
sync generator + dir regex    98.01 ms/iter  99.12 ms  99.89 ms █▁▁█▁▅▁▅▅▅▅
async generator + dir regex  103.67 ms/iter 104.53 ms 104.88 ms ▅█▁▅▁▁█▁▁█▅

summary
  sync generator + dir regex
   1.02x faster than sync generator + dir globby
   1.06x faster than async generator + dir regex

• dir-3-file-10-nest-6-loc-1000-l-400; count: 32770; glob: **/file_[0-9]*.txt
------------------------------------------- -------------------------------
sync generator + dir globby     3.13 s/iter    2.79 s    4.46 s █▃▁▁▁▁▁▁▁▁▂
sync generator + dir regex      2.76 s/iter    2.77 s    2.79 s ▃▁▆▃▃█▃▃▁▁▃
async generator + dir regex     2.83 s/iter    2.85 s    2.88 s ▅▅▅▅▅▅▁▅█▅▅

summary
  sync generator + dir regex
   1.03x faster than async generator + dir regex
   1.13x faster than sync generator + dir globby

```

<!-- END DATA -->
