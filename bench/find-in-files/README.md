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
The  sync benchmark is the fastest.


## find in files; count: 10930; glob: /.txt/g

| alias           | avg (min … max)                                       | p75              | p99              | speed         |
| --------------- | ----------------------------------------------------- | ---------------- | ---------------- | ------------- |
| **sync**        | 274001347.42 ns/iter (265857584.00 … 289608417.00)    | 278807125.00 ns  | 286432166.00 ns  | 🔥 fastest    |
| async           | 285903458.50 ns/iter (283222750.00 … 288366959.00)    | 287662333.00 ns  | 288268667.00 ns  | 1.04x slower  |
| fastFindInFiles | 7165497163.25 ns/iter (6894166500.00 … 7383160125.00) | 7226212834.00 ns | 7371147542.00 ns | 26.15x slower |

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
            } else if (entry.isFile() && fullPath.match(glob)) {
                for (const result of await findInFile(fullPath, pattern, bail)) {
                    results.push(result);
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
clk: ~3.47 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• find in files; count: 10930; glob: /.txt/g
------------------------------------------- -------------------------------
sync                         292.95 ms/iter 293.07 ms 300.01 ms ▃▆▁▆▃▃█▁▁▁▃
async                        300.86 ms/iter 304.60 ms 309.55 ms ▅▅▁██▅▅▅▅▁▅
fastFindInFiles                 7.24 s/iter    7.30 s    7.44 s ▃▃█▁▁█▃▁▁▃▃

summary
  sync
   1.03x faster than async
   24.73x faster than fastFindInFiles

```

<!-- END DATA -->
