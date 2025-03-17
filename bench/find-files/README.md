<!-- START HEADER -->
# find-files
<!-- END HEADER -->

Description: TBD

---

## Benchmark Requirements

- TBD

---

<!-- START OVERVIEW -->
The  sync benchmark is the fastest.


## flat-100-files; count: 100; glob: /.txt/g

| alias    | avg (min … max)                           | p75          | p99          | speed        |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **sync** | 149393.24 ns/iter (139083.00 … 204292.00) | 151167.00 ns | 182667.00 ns | 🔥 fastest   |
| async    | 176507.09 ns/iter (163791.00 … 289333.00) | 178375.00 ns | 220875.00 ns | 1.18x slower |

## nest-100-files; count: 10930; glob: /.txt/g

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 24575261.04 ns/iter (23922750.00 … 26238542.00) | 24651375.00 ns | 26182167.00 ns | 🔥 fastest   |
| async    | 43189838.07 ns/iter (42181917.00 … 44531958.00) | 43693375.00 ns | 44273667.00 ns | 1.76x slower |

## nest-10-files; count: 10930; glob: /.txt/g

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 25114327.33 ns/iter (24117667.00 … 26940750.00) | 25812041.00 ns | 26767875.00 ns | 🔥 fastest   |
| async    | 42487084.89 ns/iter (41731209.00 … 43680792.00) | 42701459.00 ns | 43431417.00 ns | 1.69x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->
## find-files.async.ts
_[find-files.async.ts](find-files/src)_
```ts
import * as fs from "node:fs/promises";
import * as path from "node:path";

export default async function findFiles(
    baseDir: string,
    glob: RegExp
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
    baseDir: string,
    glob: RegExp
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

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.49 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• flat-100-files; count: 100; glob: /.txt/g
------------------------------------------- -------------------------------
sync                         155.35 µs/iter 159.42 µs 189.54 µs ▂█▇▅▃▃▂▁▁▁▁
async                        187.73 µs/iter 189.79 µs 264.13 µs ▂█▄▃▂▁▁▁▁▁▁

summary
  sync
   1.21x faster than async

• nest-100-files; count: 10930; glob: /.txt/g
------------------------------------------- -------------------------------
sync                          25.74 ms/iter  26.16 ms  27.04 ms ▃▇▇▂▅█▄▃▃▂▃
async                         43.44 ms/iter  43.72 ms  45.05 ms ▂▃▇▁█▃▃▂▁▃▂

summary
  sync
   1.69x faster than async

• nest-10-files; count: 10930; glob: /.txt/g
------------------------------------------- -------------------------------
sync                          24.78 ms/iter  25.34 ms  25.85 ms ▃█▅▄▂▂▁▃▄▃▂
async                         46.28 ms/iter  50.93 ms  52.93 ms ▂▁▆█▃▁▁▃▂▅▃

summary
  sync
   1.87x faster than async

```

<!-- END DATA -->
