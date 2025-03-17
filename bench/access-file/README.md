<!-- START HEADER -->
# access-file
<!-- END HEADER -->

Description: TBD

---

## Benchmark Requirements

- TBD

---

<!-- START OVERVIEW -->
The  node:fs.readFileSync benchmark is the fastest.


## file access; loc: 100;

| alias                    | avg (min … max)                           | p75          | p99          | speed         |
| ------------------------ | ----------------------------------------- | ------------ | ------------ | ------------- |
| **node:fs.readFileSync** | 7841.36 ns/iter (7640.02 … 8198.60)       | 7969.66 ns   | 8151.47 ns   | 🔥 fastest    |
| node:fs/promise.readFile | 125984.07 ns/iter (99334.00 … 392917.00)  | 129583.00 ns | 242250.00 ns | 16.07x slower |
| node:readline            | 232471.74 ns/iter (192542.00 … 556833.00) | 240958.00 ns | 329459.00 ns | 29.65x slower |

## file access; loc: 1000;

| alias                    | avg (min … max)                           | p75          | p99          | speed         |
| ------------------------ | ----------------------------------------- | ------------ | ------------ | ------------- |
| **node:fs.readFileSync** | 26773.27 ns/iter (26543.04 … 27086.21)    | 26905.63 ns  | 26973.61 ns  | 🔥 fastest    |
| node:fs/promise.readFile | 70881.15 ns/iter (59850.19 … 73539.74)    | 73092.68 ns  | 73466.15 ns  | 2.65x slower  |
| node:readline            | 646319.26 ns/iter (572083.00 … 770583.00) | 662459.00 ns | 744791.00 ns | 24.14x slower |

## file access; loc: 10000;

| alias                        | avg (min … max)                              | p75           | p99           | speed         |
| ---------------------------- | -------------------------------------------- | ------------- | ------------- | ------------- |
| **node:fs/promise.readFile** | 376297.66 ns/iter (338625.00 … 504542.00)    | 383958.00 ns  | 452875.00 ns  | 🔥 fastest    |
| node:fs.readFileSync         | 533772.21 ns/iter (478959.00 … 741250.00)    | 543834.00 ns  | 684750.00 ns  | 1.42x slower  |
| node:readline                | 4402708.96 ns/iter (3836916.00 … 4858125.00) | 4534834.00 ns | 4808333.00 ns | 11.70x slower |

## file access; loc: 100000;

| alias                        | avg (min … max)                                 | p75            | p99            | speed         |
| ---------------------------- | ----------------------------------------------- | -------------- | -------------- | ------------- |
| **node:fs/promise.readFile** | 2691327.25 ns/iter (2555917.00 … 3081917.00)    | 2728375.00 ns  | 3069541.00 ns  | 🔥 fastest    |
| node:fs.readFileSync         | 4212338.30 ns/iter (4005833.00 … 4749417.00)    | 4285792.00 ns  | 4608083.00 ns  | 1.57x slower  |
| node:readline                | 37398813.81 ns/iter (36849334.00 … 38135625.00) | 37536625.00 ns | 37965208.00 ns | 13.90x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->
## node-fs.promise.readFile.ts
_[node-fs.promise.readFile.ts](access-file/src)_
```ts
import * as fs from "node:fs/promises";

export default function accessFile(filePath: string): Promise<string> {
    return fs.readFile(filePath, "utf8");
}

```

## node-fs.readFileSync.ts
_[node-fs.readFileSync.ts](access-file/src)_
```ts
import * as fs from "node:fs";

export default function accessFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf8");
}

```

## node-readline.ts
_[node-readline.ts](access-file/src)_
```ts
import * as fs from "node:fs";
import * as readline from "node:readline";

export default async function* accessFile(filePath: string): AsyncGenerator<string> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({input: stream});

    try {
        for await (const line of rl) {
            yield line;
        }
    } finally {
        rl.close();
    }
}

```

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.33 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• file access; loc: 100;
------------------------------------------- -------------------------------
node:fs.readFileSync           7.93 µs/iter   7.98 µs   8.13 µs ▃▇▄▇▆█▂▁▁▂▂
node:fs/promise.readFile     124.55 µs/iter 130.13 µs 201.29 µs ▃▅█▇▃▂▁▁▁▁▁
node:readline                233.24 µs/iter 241.75 µs 341.08 µs ▁███▄▂▂▁▁▁▁

summary
  node:fs.readFileSync
   15.71x faster than node:fs/promise.readFile
   29.42x faster than node:readline

• file access; loc: 1000;
------------------------------------------- -------------------------------
node:fs.readFileSync          27.72 µs/iter  27.87 µs  28.31 µs ▅▅█▅▅▁▅▁▁▁▅
node:fs/promise.readFile      71.42 µs/iter  73.95 µs  74.04 µs ▃▁▁▁▁▁▁▁▁▅█
node:readline                644.37 µs/iter 662.00 µs 743.96 µs ▁▁▃▅██▅▃▂▁▁

summary
  node:fs.readFileSync
   2.58x faster than node:fs/promise.readFile
   23.24x faster than node:readline

• file access; loc: 10000;
------------------------------------------- -------------------------------
node:fs.readFileSync         566.27 µs/iter 576.13 µs 757.79 µs ▂██▄▂▂▂▂▁▁▁
node:fs/promise.readFile     381.38 µs/iter 389.38 µs 491.50 µs ▂▄██▄▂▁▁▁▁▁
node:readline                  4.48 ms/iter   4.64 ms   4.94 ms ▁▃▃▃▅▇█▇▃▃▁

summary
  node:fs/promise.readFile
   1.48x faster than node:fs.readFileSync
   11.75x faster than node:readline

• file access; loc: 100000;
------------------------------------------- -------------------------------
node:fs.readFileSync           4.48 ms/iter   4.59 ms   5.82 ms ▂█▅▄▂▁▂▁▂▁▁
node:fs/promise.readFile       2.78 ms/iter   2.82 ms   3.45 ms ▃▇█▅▃▁▂▂▂▂▁
node:readline                 39.24 ms/iter  39.38 ms  42.57 ms ▂▅█▄▂▂▂▁▂▁▂

summary
  node:fs/promise.readFile
   1.61x faster than node:fs.readFileSync
   14.13x faster than node:readline

```

<!-- END DATA -->
