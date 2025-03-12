# Find Pattern in File - Benchmarks

This benchmark explores various techniques available in **Node.js** for efficiently finding patterns within a file.

---

## Benchmark Requirements

- **Search Content:** The search content should get returned as *string**
    - **Line:** The content should be accessible line by line

---

## Overview

| **File**          | **fs.readFileSync** | **fs/promises.readFile** | **readline** | **Fastest Speed Advantage**    |
|-------------------|---------------------|--------------------------|--------------|--------------------------------|
| `10-loc.txt`      | **6.23 µs**         | 512.18 µs                | 481.15 µs    | **77.28x faster** than closest |
| `100-loc.txt`     | **8.08 µs**         | 45.42 µs                 | 459.36 µs    | **5.62x faster** than closest  |
| `1000-loc.txt`    | **29.52 µs**        | 581.85 µs                | 781.66 µs    | **19.71x faster** than closest |
| `10000-loc.txt`   | **564.30 µs**       | 1.22 ms                  | 2.92 ms      | **2.17x faster** than closest  |
| `100000-loc.txt`  | 9.32 ms             | **8.20 ms**              | 14.28 ms     | **1.14x faster** than closest  |
| `1000000-loc.txt` | **25.03 ms**        | 41.92 ms                 | 56.63 ms     | **1.68x faster** than closest  |

---

### How Much Faster?

- **Small Files (10-1000 LOC):**
    - `fs.readFileSync` is **5.6x to 77x faster**, showing that synchronous reading is extremely efficient for small
      files.

- **Medium Files (10,000 LOC):**
    - The speed difference reduces, but `fs.readFileSync` remains **2.17x faster** than its async counterpart.

- **Large Files (100,000 LOC):**
    - Surprisingly, `fs/promises.readFile` slightly outperforms `fs.readFileSync`, indicating that asynchronous
      operations can start to optimize better for larger file sizes.

- **Massive Files (1,000,000 LOC):**
    - `fs.readFileSync` regains performance advantage, being **1.68x faster** than the async variant, and **2.26x faster
      ** than `readline`.

---

## File Content Access Methods

--- 

Overview

- `node:fs.readFileSync`
- `node:fs.readFile`
- `node:fs.createReadStream` with `node:readline.createInterface`

---

### 1. Synchronous File Reading

- **Method:** `fs.readFileSync`
- **Description:** Reads the entire file synchronously into memory before processing.
- **Source:** [node-fs.readFileSync.ts](./src/node-fs.readFileSync.ts)

```javascript
import * as fs from "node:fs";

export default function accessContent(filePath: string): void {
    const content = fs.readFileSync(filePath, "utf8");
    content.split("\n")
        .forEach(line => (line === 'not-in-file'));
}
```

### 2. Asynchronous File Reading

- **Method:** `fs.promises.readFile`
- **Description:** Reads the entire file asynchronously into memory before processing.
- **Source:** [node-fs.promise.readFile.ts](./src/node-fs.promise.readFile.ts)

```javascript
import * as fs from "node:fs/promises";

export default async function accessContent(filePath): Promise<void> {
    const content = await fs.readFile(filePath, "utf8");
    content.split("\n")
        .forEach(line => (line === 'not-in-file'));
}
```

### 3. Streaming File Reading (Line by Line)

- **Method:** `fs.createReadStream` with `readline.createInterface`
- **Description:** Processes the file line by line without loading the entire file into memory.
- **Source:** [node-readline](./src/node-readline.ts)

```javascript
import * as fs from "node:fs";
import * as readline from "node:readline";

export default async function accessContent(filePath: string): Promise<void> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({input: stream});
    for await (const line of rl) {
        line === 'not-in-file';
    }
}
```

--- 

## Benchmark Results

```shell
> npx tsx --tsconfig=../tsconfig.perf.json file-access

clk: ~3.33 GHz
cpu: Apple M2 Max
runtime: node 22.12.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• file access; loc: 10;
------------------------------------------- -------------------------------
node:fs.readFileSync           6.23 µs/iter   6.26 µs   6.83 µs ▂█▆▃▂▁▁▁▁▁▁
node:fs/promise.readFile     512.18 µs/iter 661.42 µs   1.36 ms ▂█▄▂▃▂▁▁▁▁▁
node:readline                481.15 µs/iter 533.42 µs 978.21 µs ▁▁▂█▅▂▂▂▂▁▁

summary
  node:fs.readFileSync
   77.28x faster than node:readline
   82.26x faster than node:fs/promise.readFile

• file access; loc: 100;
------------------------------------------- -------------------------------
node:fs.readFileSync           8.08 µs/iter   8.09 µs   8.38 µs ▃▅▇█▅▃▁▁▃▃▂
node:fs/promise.readFile      45.42 µs/iter  45.30 µs  46.21 µs ▅▃█▅▁▁▁▁▃▁▃
node:readline                459.36 µs/iter 515.54 µs 931.92 µs ▁▁▂█▅▂▂▂▂▁▁

summary
  node:fs.readFileSync
   5.62x faster than node:fs/promise.readFile
   56.83x faster than node:readline

• file access; loc: 1000;
------------------------------------------- -------------------------------
node:fs.readFileSync          29.52 µs/iter  29.07 µs  29.82 µs ▂▂█▁▄▂▁▁▁▁▂
node:fs/promise.readFile     581.85 µs/iter 720.67 µs   1.35 ms ▁▇█▂▂▃▂▂▁▁▁
node:readline                781.66 µs/iter 837.54 µs   1.36 ms ▁▁▁▄█▃▂▂▂▂▁

summary
  node:fs.readFileSync
   19.71x faster than node:fs/promise.readFile
   26.48x faster than node:readline

• file access; loc: 10000;
------------------------------------------- -------------------------------
node:fs.readFileSync         564.30 µs/iter 568.13 µs   1.44 ms ▂▁█▃▁▁▁▁▁▁▁
node:fs/promise.readFile       1.22 ms/iter   1.38 ms   1.74 ms ▁▅█▇▆▆▇▄▃▂▁
node:readline                  2.92 ms/iter   3.00 ms   3.23 ms ▁▃▅▄▆█▇▅▃▂▁

summary
  node:fs.readFileSync
   2.17x faster than node:fs/promise.readFile
   5.17x faster than node:readline

• file access; loc: 100000;
------------------------------------------- -------------------------------
node:fs.readFileSync           9.32 ms/iter   9.65 ms   9.97 ms ▁▁▁▁▁▁▁▂▄█▂
node:fs/promise.readFile       8.20 ms/iter   8.78 ms   9.28 ms ▃▄▂▂▃▃▄▆█▄▁
node:readline                 14.28 ms/iter  14.46 ms  15.08 ms ▂▆█▆▅▃▄▂▂▂▂

summary
  node:fs/promise.readFile
   1.14x faster than node:fs.readFileSync
   1.74x faster than node:readline

• file access; loc: 1000000;
------------------------------------------- -------------------------------
node:fs.readFileSync          25.03 ms/iter  24.87 ms  34.75 ms ▂█▂▁▁▁▁▁▁▁▁
node:fs/promise.readFile      41.92 ms/iter  45.11 ms  46.60 ms ▅▄▁▁▁▃▃▄█▇▃
node:readline                 56.63 ms/iter  56.98 ms  57.20 ms ▃▁▃▃▆▆▅▆▃█▃

summary
  node:fs.readFileSync
   1.68x faster than node:fs/promise.readFile
   2.26x faster than node:readline
```
