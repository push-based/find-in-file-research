# Find Pattern in File - Benchmarks

This benchmark explores various techniques available in **Node.js** for efficiently finding patterns within a file.

---

## Benchmark Requirements

- **Search Results:** Each search should return an **array of hits**, where each hit includes:
  - 📄 **Start Column:** The starting position (column) of the pattern within the content.
  - 📍 **End Column:** The ending position (column) of the pattern within the content.
- **Multiple Matches:** The method must be able to capture multiple matches in the content, if present.

---

## File Content Matching

---

### Overview
| **File**          | **Pattern** | **String.indexOf** | **RegExp.exec** | **String.matchAll** | **Fastest Speed Advantage** |
|-------------------|------------|--------------------|----------------|---------------------|-----------------------------|
| `10-loc.txt`      | `<10%>`    | **96.16 ns**       | 340.24 ns      | 578.26 ns           | **3.54x faster** than `RegExp.exec` |
|                   | `<50%>`    | **95.93 ns**       | 337.37 ns      | 563.50 ns           | **3.52x faster** than `RegExp.exec` |
|                   | `<100%>`   | **94.45 ns**       | 330.69 ns      | 567.43 ns           | **3.5x faster** than `RegExp.exec` |
| `100-loc.txt`     | `<10%>`    | **2.04 µs**        | 3.28 µs        | 3.48 µs             | **1.61x faster** than `RegExp.exec` |
|                   | `<50%>`    | **2.02 µs**        | 3.30 µs        | 3.47 µs             | **1.64x faster** than `RegExp.exec` |
|                   | `<100%>`   | **2.03 µs**        | 3.29 µs        | 3.49 µs             | **1.62x faster** than `RegExp.exec` |
| `1000-loc.txt`    | `<10%>`    | **32.12 µs**       | 32.32 µs       | 32.67 µs            | **1.01x faster** than `RegExp.exec` |
|                   | `<50%>`    | 32.36 µs           | **32.15 µs**   | 32.53 µs            | **1.01x faster** than `String.indexOf` |
|                   | `<100%>`   | 32.27 µs           | **32.13 µs**   | 32.65 µs            | **1.01x faster** than `String.indexOf` |
| `10000-loc.txt`   | `<10%>`    | **354.79 µs**      | 358.56 µs      | 355.78 µs           | **1.01x faster** than `RegExp.exec` |
|                   | `<50%>`    | **355.72 µs**      | 358.33 µs      | 356.53 µs           | **1.01x faster** than `RegExp.exec` |
|                   | `<100%>`   | 356.23 µs          | **356.02 µs**  | 356.95 µs           | **1.01x faster** than `String.indexOf` |
| `100000-loc.txt`  | `<10%>`    | 3.49 ms            | **3.46 ms**    | 3.50 ms             | **1.01x faster** than `String.indexOf` |
|                   | `<50%>`    | 3.47 ms            | 3.51 ms        | **3.47 ms**         | **1.01x faster** than `RegExp.exec` |
|                   | `<100%>`   | 3.49 ms            | 3.49 ms        | **3.49 ms**         | Performance is identical |
| `1000000-loc.txt` | `<10%>`    | 9.63 ms            | 9.67 ms        | **9.62 ms**         | **1.01x faster** than `String.indexOf` |
|                   | `<50%>`    | **9.63 ms**        | 9.81 ms        | 9.78 ms             | **1.02x faster** than `RegExp.exec` |
|                   | `<100%>`   | 9.73 ms            | 9.70 ms        | **9.64 ms**         | **1.01x faster** than `RegExp.exec` |

---

### ⚡️ How Much Faster?

- **Small Files (10-100 LOC):**
  - `String.indexOf` is **3.5x to 1.6x faster** than the next best method.
  - This speed difference means that for 10,000 operations, `String.indexOf` could save **up to 1 second** compared to regex-based methods.

- **Medium Files (1000-10000 LOC):**
  - The advantage reduces to around **1.01x to 1.02x**, showing how optimization pays off less with bigger datasets, but still matters for bulk operations.

- **Large Files (100000-1000000 LOC):**
  - Differences become minimal, with performance differences within **1-2%**.
  - In practice, this means `String.indexOf` or `matchAll` could save a few milliseconds in large batch operations.

---

### String IndexOf (Custom Loop for Multiple Matches)

- **Method:** `String.indexOf`
- **Description:** Iterates through the string manually to find multiple matches.
- **Source:** [node-String.indexOf.ts](./src/node-String.indexOf.ts)

```javascript
import {LineHit} from "../../../src/lib/file-system.ts";

export default function getLineHit(content: string, pattern: string): LineHit[] {
  const hits = [];
  let index = content.indexOf(pattern);

  while (index !== -1) {
    hits.push({startColumn: index, endColumn: index + pattern.length});
    index = content.indexOf(pattern, index + 1);
  }
  return hits
}
```

---

### Regular Expression Exec (With Global Flag)

- **Method:** `RegExp.exec`
- **Description:** Executes a search for a match in a specified string and captures multiple matches using the global flag.
- **Source:** [node-String.matchAll.ts](./src/node-String.matchAll.ts)

```javascript
import {LineHit} from "../../../src/lib/file-system.ts";

export default function getLineHit(content: string, pattern: RegExp): LineHit[] {
  return [...content.matchAll(pattern)].map(
          ({index = 0, 0: match = ''}) => ({
            startColumn: index,
            endColumn: index + match.length,
          })
  );
}
```

---

### String MatchAll

- **Method:** `String.matchAll`
- **Description:** Returns an iterator of all results matching a string against a regular expression.
- **Source:** [node-RegExp.exec.ts](./src/node-RegExp.exec.ts)

```javascript
import {LineHit} from "../../../src/lib/file-system.ts";

export default function getLineHit(content: string, pattern: RegExp): LineHit[] {
  const hits = [];
  let match;

  while ((match = pattern.exec(content)) != null) {
    hits.push({startColumn: match.index, endColumn: match.index + match[0].length});
  }
  return hits;
}
```

--- 

## Benchmark Results

```shell
> node --expose-gc --experimental-strip-types ./bench/content-matching/index.ts

(node:44573) ExperimentalWarning: Type Stripping is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
clk: ~3.41 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• content matching; loc: 10; pattern: <10%>
------------------------------------------- -------------------------------
node:String.indexOf          334.80 ns/iter 339.54 ns 373.09 ns ▁▃██▇▃▃▂▂▁▁
node:String.matchAll         448.51 ns/iter 460.86 ns 486.77 ns ▂▄▇█▇▆█▆▃▂▁
node:RegExp.exec             349.62 ns/iter 357.54 ns 386.59 ns ▂▇▆▆██▄▃▂▁▁

                             ┌                                            ┐
         node:String.indexOf ┤ 334.80 ns
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 448.51 ns
            node:RegExp.exec ┤■■■■ 349.62 ns
                             └                                            ┘

summary
  node:String.indexOf
   1.04x faster than node:RegExp.exec
   1.34x faster than node:String.matchAll

• content matching; loc: 10; pattern: <50%>
------------------------------------------- -------------------------------
node:String.indexOf          337.38 ns/iter 345.40 ns 375.98 ns ▁▄█▇▆▅▄▃▂▁▁
node:String.matchAll         441.70 ns/iter 451.77 ns 476.11 ns ▁▃▇█▅▄▅▄▃▁▁
node:RegExp.exec             343.41 ns/iter 351.88 ns 381.10 ns ▁▁▅█▅▆▆▃▂▂▁

                             ┌                                            ┐
         node:String.indexOf ┤ 337.38 ns
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 441.70 ns
            node:RegExp.exec ┤■■ 343.41 ns
                             └                                            ┘

summary
  node:String.indexOf
   1.02x faster than node:RegExp.exec
   1.31x faster than node:String.matchAll

• content matching; loc: 10; pattern: <100%>
------------------------------------------- -------------------------------
node:String.indexOf          343.01 ns/iter 350.04 ns 366.30 ns ▁▂▄▄▄▅█▅▃▂▁
node:String.matchAll         450.04 ns/iter 459.84 ns 485.57 ns ▁▃▄▅▆██▅▂▂▁
node:RegExp.exec             346.91 ns/iter 354.58 ns 383.70 ns ▁▂██▆▅▅▂▁▂▁

                             ┌                                            ┐
         node:String.indexOf ┤ 343.01 ns
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 450.04 ns
            node:RegExp.exec ┤■ 346.91 ns
                             └                                            ┘

summary
  node:String.indexOf
   1.01x faster than node:RegExp.exec
   1.31x faster than node:String.matchAll

• content matching; loc: 100; pattern: <10%>
------------------------------------------- -------------------------------
node:String.indexOf            3.31 µs/iter   3.34 µs   3.51 µs ▁█▆▇▅▃▃▂▂▁▁
node:String.matchAll           3.41 µs/iter   3.43 µs   3.54 µs ▁▅█▆▆▇▃▄▂▁▂
node:RegExp.exec               3.29 µs/iter   3.31 µs   3.38 µs ▂▅▆█▇▃▄▃▂▂▂

                             ┌                                            ┐
         node:String.indexOf ┤■■■■■■■ 3.31 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.41 µs
            node:RegExp.exec ┤ 3.29 µs
                             └                                            ┘

summary
  node:RegExp.exec
   1.01x faster than node:String.indexOf
   1.03x faster than node:String.matchAll

• content matching; loc: 100; pattern: <50%>
------------------------------------------- -------------------------------
node:String.indexOf            3.31 µs/iter   3.34 µs   3.44 µs ▁▂▄█▄▄▃▄▂▂▁
node:String.matchAll           3.39 µs/iter   3.42 µs   3.53 µs ▂▅█▆▄▇▃▁▂▁▁
node:RegExp.exec               3.31 µs/iter   3.34 µs   3.44 µs ▃▇▅█▇▄▃▃▂▂▁

                             ┌                                            ┐
         node:String.indexOf ┤ 3.31 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.39 µs
            node:RegExp.exec ┤■■ 3.31 µs
                             └                                            ┘

summary
  node:String.indexOf
   1x faster than node:RegExp.exec
   1.02x faster than node:String.matchAll

• content matching; loc: 100; pattern: <100%>
------------------------------------------- -------------------------------
node:String.indexOf            3.29 µs/iter   3.32 µs   3.37 µs ▂▄█▇▅▃▅▄▄▃▂
node:String.matchAll           3.43 µs/iter   3.47 µs   3.58 µs ▅▆█▅▇▆▇▃▅▂▂
node:RegExp.exec               3.30 µs/iter   3.32 µs   3.44 µs ▁▅▅█▅▄▃▃▁▁▁

                             ┌                                            ┐
         node:String.indexOf ┤ 3.29 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.43 µs
            node:RegExp.exec ┤■■ 3.30 µs
                             └                                            ┘

summary
  node:String.indexOf
   1x faster than node:RegExp.exec
   1.04x faster than node:String.matchAll

• content matching; loc: 1000; pattern: <10%>
------------------------------------------- -------------------------------
node:String.indexOf           32.55 µs/iter  32.77 µs  33.22 µs ▃▃▁█▁▁▃█▃▁▃
node:String.matchAll          32.49 µs/iter  32.67 µs  33.22 µs ▆█▃▁▃▃▃▃▁▁▃
node:RegExp.exec              32.82 µs/iter  33.32 µs  33.43 µs ▃▁▃█▁▃▁▃▃▆▃

                             ┌                                            ┐
         node:String.indexOf ┤■■■■■■■ 32.55 µs
        node:String.matchAll ┤ 32.49 µs
            node:RegExp.exec ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 32.82 µs
                             └                                            ┘

summary
  node:String.matchAll
   1x faster than node:String.indexOf
   1.01x faster than node:RegExp.exec

• content matching; loc: 1000; pattern: <50%>
------------------------------------------- -------------------------------
node:String.indexOf           32.31 µs/iter  32.47 µs  32.76 µs ▆█▁▁▆▃▁▃▁▃▃
node:String.matchAll          32.38 µs/iter  32.46 µs  32.92 µs █▅█▅█▅▁▅▁▁▅
node:RegExp.exec              32.24 µs/iter  32.37 µs  32.46 µs ▃▁▃▆▁▃█▁▃▃▃

                             ┌                                            ┐
         node:String.indexOf ┤■■■■■■■■■■■■■■■■■ 32.31 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 32.38 µs
            node:RegExp.exec ┤ 32.24 µs
                             └                                            ┘

summary
  node:RegExp.exec
   1x faster than node:String.indexOf
   1x faster than node:String.matchAll

• content matching; loc: 1000; pattern: <100%>
------------------------------------------- -------------------------------
node:String.indexOf           32.49 µs/iter  32.59 µs  32.96 µs ▃▃▃█▃▁█▁▁▁▃
node:String.matchAll          32.99 µs/iter  33.38 µs  33.50 µs █▅▅▁▁█▁▅▅█▅
node:RegExp.exec              33.07 µs/iter  33.28 µs  33.34 µs ▃▃▁▁▁▁▃▃█▃▅

                             ┌                                            ┐
         node:String.indexOf ┤ 32.49 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 32.99 µs
            node:RegExp.exec ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 33.07 µs
                             └                                            ┘

summary
  node:String.indexOf
   1.02x faster than node:String.matchAll
   1.02x faster than node:RegExp.exec

• content matching; loc: 10000; pattern: <10%>
------------------------------------------- -------------------------------
node:String.indexOf          366.36 µs/iter 375.17 µs 402.67 µs ▁▂▄██▇▆▄▃▃▁
node:String.matchAll         377.93 µs/iter 389.46 µs 415.63 µs ▁▂▄▇▆██▆▅▂▂
node:RegExp.exec             362.13 µs/iter 366.96 µs 388.79 µs ▁▁▁▁▂█▇▅▂▂▁

                             ┌                                            ┐
         node:String.indexOf ┤■■■■■■■■■ 366.36 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 377.93 µs
            node:RegExp.exec ┤ 362.13 µs
                             └                                            ┘

summary
  node:RegExp.exec
   1.01x faster than node:String.indexOf
   1.04x faster than node:String.matchAll

• content matching; loc: 10000; pattern: <50%>
------------------------------------------- -------------------------------
node:String.indexOf          362.02 µs/iter 368.42 µs 394.50 µs ▁▁▁▁▅█▆▄▂▂▁
node:String.matchAll         377.61 µs/iter 388.04 µs 418.96 µs ▁▁▁▃▇██▆▄▂▁
node:RegExp.exec             362.90 µs/iter 367.08 µs 391.38 µs ▁▁▁▂█▆▅▃▂▁▁

                             ┌                                            ┐
         node:String.indexOf ┤ 362.02 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 377.61 µs
            node:RegExp.exec ┤■■ 362.90 µs
                             └                                            ┘

summary
  node:String.indexOf
   1x faster than node:RegExp.exec
   1.04x faster than node:String.matchAll

• content matching; loc: 10000; pattern: <100%>
------------------------------------------- -------------------------------
node:String.indexOf          362.82 µs/iter 368.33 µs 390.92 µs ▁▁▁▁▄█▆▄▂▁▁
node:String.matchAll         379.65 µs/iter 390.54 µs 428.29 µs ▁▁▁▆▆▆█▅▂▂▁
node:RegExp.exec             361.96 µs/iter 367.00 µs 391.04 µs ▁▁▁▁▃█▅▃▂▁▁

                             ┌                                            ┐
         node:String.indexOf ┤■■ 362.82 µs
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 379.65 µs
            node:RegExp.exec ┤ 361.96 µs
                             └                                            ┘

summary
  node:RegExp.exec
   1x faster than node:String.indexOf
   1.05x faster than node:String.matchAll

• content matching; loc: 100000; pattern: <10%>
------------------------------------------- -------------------------------
node:String.indexOf            3.57 ms/iter   3.66 ms   3.82 ms ▂▄▇▆▅▅▇█▃▂▂
node:String.matchAll           3.52 ms/iter   3.57 ms   3.75 ms ▁▂▆█▆▅▄▃▃▂▁
node:RegExp.exec               3.51 ms/iter   3.57 ms   3.72 ms ▁▂▆▇█▅▄▂▄▄▁

                             ┌                                            ┐
         node:String.indexOf ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.57 ms
        node:String.matchAll ┤■■■■■ 3.52 ms
            node:RegExp.exec ┤ 3.51 ms
                             └                                            ┘

summary
  node:RegExp.exec
   1x faster than node:String.matchAll
   1.02x faster than node:String.indexOf

• content matching; loc: 100000; pattern: <50%>
------------------------------------------- -------------------------------
node:String.indexOf            3.53 ms/iter   3.62 ms   3.81 ms ▂▂▆█▆▃▅▅▂▂▁
node:String.matchAll           3.59 ms/iter   3.66 ms   3.89 ms ▁▃▅▇█▆█▄▃▁▁
node:RegExp.exec               3.58 ms/iter   3.67 ms   3.83 ms ▂▂▅▆▆▄▆█▃▂▂

                             ┌                                            ┐
         node:String.indexOf ┤ 3.53 ms
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.59 ms
            node:RegExp.exec ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.58 ms
                             └                                            ┘

summary
  node:String.indexOf
   1.01x faster than node:RegExp.exec
   1.02x faster than node:String.matchAll

• content matching; loc: 100000; pattern: <100%>
------------------------------------------- -------------------------------
node:String.indexOf            3.50 ms/iter   3.57 ms   3.72 ms ▂▃▇██▄▄▄▅▂▂
node:String.matchAll           3.53 ms/iter   3.60 ms   3.77 ms ▂▂▄█▇▆▄▄▃▂▁
node:RegExp.exec               3.55 ms/iter   3.64 ms   3.77 ms ▂▃▆█▇▆▄▇▆▃▃

                             ┌                                            ┐
         node:String.indexOf ┤ 3.50 ms
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■ 3.53 ms
            node:RegExp.exec ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.55 ms
                             └                                            ┘

summary
  node:String.indexOf
   1.01x faster than node:String.matchAll
   1.01x faster than node:RegExp.exec

• content matching; loc: 1000000; pattern: <10%>
------------------------------------------- -------------------------------
node:String.indexOf            3.87 ms/iter   3.96 ms   4.15 ms ▂▂▃▅▆██▆▄▃▂
node:String.matchAll           3.85 ms/iter   3.92 ms   4.13 ms ▁▁▃▄▄▆█▅▃▂▂
node:RegExp.exec               3.83 ms/iter   3.91 ms   4.10 ms ▂▃▅▅▇█▇▅▄▂▂

                             ┌                                            ┐
         node:String.indexOf ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.87 ms
        node:String.matchAll ┤■■■■■■■■■■■■■■ 3.85 ms
            node:RegExp.exec ┤ 3.83 ms
                             └                                            ┘

summary
  node:RegExp.exec
   1x faster than node:String.matchAll
   1.01x faster than node:String.indexOf

• content matching; loc: 1000000; pattern: <50%>
------------------------------------------- -------------------------------
node:String.indexOf            3.81 ms/iter   3.91 ms   4.11 ms ▁▂▂▅▇█▇▆▅▃▂
node:String.matchAll           3.87 ms/iter   3.96 ms   4.12 ms ▁▂▃▃▅▆▇█▅▄▂
node:RegExp.exec               3.85 ms/iter   3.96 ms   4.12 ms ▂▄▄▇▆▆▇█▆▄▂

                             ┌                                            ┐
         node:String.indexOf ┤ 3.81 ms
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.87 ms
            node:RegExp.exec ┤■■■■■■■■■■■■■■■■■■■■■■■ 3.85 ms
                             └                                            ┘

summary
  node:String.indexOf
   1.01x faster than node:RegExp.exec
   1.02x faster than node:String.matchAll

• content matching; loc: 1000000; pattern: <100%>
------------------------------------------- -------------------------------
node:String.indexOf            3.82 ms/iter   3.93 ms   4.09 ms ▂▂▄▆█▇██▆▄▂
node:String.matchAll           3.83 ms/iter   3.92 ms   4.14 ms ▂▂▅▇▇█▅▆▃▂▂
node:RegExp.exec               3.82 ms/iter   3.91 ms   4.11 ms ▂▃▄▆▆█▇▆▃▃▃

                             ┌                                            ┐
         node:String.indexOf ┤■■■■■■■■■■■■■■■■ 3.82 ms
        node:String.matchAll ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 3.83 ms
            node:RegExp.exec ┤ 3.82 ms
                             └                                            ┘

summary
  node:RegExp.exec
   1x faster than node:String.indexOf
   1x faster than node:String.matchAll
```
