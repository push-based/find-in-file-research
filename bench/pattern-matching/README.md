<!-- START HEADER -->
# pattern-matching
<!-- END HEADER -->

This benchmark explores various techniques available in **Node.js** for efficiently finding patterns within a file.

---

## Benchmark Requirements

- **Search Results:** Each search should return an **array of hits**, where each hit includes:
  - 📄 **Start Column:** The starting position (column) of the pattern within the content.
  - 📍 **End Column:** The ending position (column) of the pattern within the content.
- **Multiple Matches:** The method must be able to capture multiple matches in the content, if present.

---

### Overview

<!-- START OVERVIEW -->
The  indexOf benchmark is the fastest.


## content matching; loc: 100; pattern: 10%

| alias       | avg (min … max)                    | p75        | p99        | speed        |
| ----------- | ---------------------------------- | ---------- | ---------- | ------------ |
| **indexOf** | 897.34 ns/iter (865.55 … 973.23)   | 910.26 ns  | 955.53 ns  | 🔥 fastest   |
| exec        | 927.35 ns/iter (886.32 … 997.89)   | 955.99 ns  | 989.44 ns  | 1.03x slower |
| matchAll    | 1033.24 ns/iter (981.48 … 1107.25) | 1064.51 ns | 1092.75 ns | 1.15x slower |

## content matching; loc: 100; pattern: 50%

| alias       | avg (min … max)                    | p75        | p99        | speed        |
| ----------- | ---------------------------------- | ---------- | ---------- | ------------ |
| **indexOf** | 910.55 ns/iter (865.70 … 972.96)   | 936.32 ns  | 962.38 ns  | 🔥 fastest   |
| exec        | 933.20 ns/iter (886.28 … 1005.89)  | 959.28 ns  | 989.20 ns  | 1.02x slower |
| matchAll    | 1049.44 ns/iter (997.20 … 1101.50) | 1068.59 ns | 1089.58 ns | 1.15x slower |

## content matching; loc: 100; pattern: 90%

| alias       | avg (min … max)                    | p75        | p99        | speed        |
| ----------- | ---------------------------------- | ---------- | ---------- | ------------ |
| **indexOf** | 882.18 ns/iter (845.41 … 951.64)   | 910.68 ns  | 946.42 ns  | 🔥 fastest   |
| exec        | 913.48 ns/iter (865.62 … 978.94)   | 939.22 ns  | 965.99 ns  | 1.04x slower |
| matchAll    | 1020.09 ns/iter (968.15 … 1086.29) | 1048.20 ns | 1076.62 ns | 1.16x slower |

## content matching; loc: 1000; pattern: 10%

| alias       | avg (min … max)                        | p75         | p99         | speed        |
| ----------- | -------------------------------------- | ----------- | ----------- | ------------ |
| **indexOf** | 11248.35 ns/iter (10972.75 … 11429.60) | 11335.32 ns | 11418.17 ns | 🔥 fastest   |
| exec        | 11391.12 ns/iter (11148.65 … 11574.40) | 11491.76 ns | 11550.65 ns | 1.01x slower |
| matchAll    | 11750.60 ns/iter (11368.63 … 11999.99) | 11895.39 ns | 11988.33 ns | 1.04x slower |

## content matching; loc: 1000; pattern: 50%

| alias       | avg (min … max)                        | p75         | p99         | speed        |
| ----------- | -------------------------------------- | ----------- | ----------- | ------------ |
| **indexOf** | 11283.59 ns/iter (10994.49 … 11508.16) | 11345.84 ns | 11478.28 ns | 🔥 fastest   |
| exec        | 11419.87 ns/iter (11269.60 … 11549.68) | 11492.91 ns | 11532.90 ns | 1.01x slower |
| matchAll    | 11825.31 ns/iter (11598.80 … 12329.61) | 11835.50 ns | 12158.95 ns | 1.05x slower |

## content matching; loc: 1000; pattern: 90%

| alias       | avg (min … max)                        | p75         | p99         | speed        |
| ----------- | -------------------------------------- | ----------- | ----------- | ------------ |
| **indexOf** | 10982.39 ns/iter (10851.26 … 11112.13) | 11037.80 ns | 11090.86 ns | 🔥 fastest   |
| exec        | 11333.95 ns/iter (11048.53 … 11520.66) | 11451.73 ns | 11499.57 ns | 1.03x slower |
| matchAll    | 11570.79 ns/iter (11368.38 … 11745.66) | 11655.91 ns | 11721.67 ns | 1.05x slower |

## content matching; loc: 10000; pattern: 10%

| alias       | avg (min … max)                           | p75          | p99          | speed        |
| ----------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **indexOf** | 167857.05 ns/iter (150000.00 … 178833.00) | 170291.00 ns | 174584.00 ns | 🔥 fastest   |
| exec        | 170461.15 ns/iter (149542.00 … 193958.00) | 172791.00 ns | 187042.00 ns | 1.02x slower |
| matchAll    | 184104.30 ns/iter (155084.00 … 228750.00) | 200584.00 ns | 216958.00 ns | 1.10x slower |

## content matching; loc: 10000; pattern: 50%

| alias       | avg (min … max)                           | p75          | p99          | speed        |
| ----------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **indexOf** | 168731.56 ns/iter (149583.00 … 191625.00) | 171250.00 ns | 177791.00 ns | 🔥 fastest   |
| exec        | 176694.77 ns/iter (151250.00 … 303083.00) | 176375.00 ns | 263917.00 ns | 1.05x slower |
| matchAll    | 195917.15 ns/iter (157459.00 … 234041.00) | 205208.00 ns | 228000.00 ns | 1.16x slower |

## content matching; loc: 10000; pattern: 90%

| alias       | avg (min … max)                           | p75          | p99          | speed        |
| ----------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **indexOf** | 168089.54 ns/iter (147500.00 … 196375.00) | 169542.00 ns | 188750.00 ns | 🔥 fastest   |
| exec        | 170191.40 ns/iter (152500.00 … 196167.00) | 172000.00 ns | 192125.00 ns | 1.01x slower |
| matchAll    | 194331.32 ns/iter (160042.00 … 261917.00) | 203625.00 ns | 224875.00 ns | 1.16x slower |

## content matching; loc: 100000; pattern: 10%

| alias    | avg (min … max)                              | p75           | p99           | speed        |
| -------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **exec** | 1793558.63 ns/iter (1658417.00 … 1999083.00) | 1823458.00 ns | 1921209.00 ns | 🔥 fastest   |
| indexOf  | 1800988.08 ns/iter (1656500.00 … 3125083.00) | 1814125.00 ns | 2010458.00 ns | 1.00x slower |
| matchAll | 1841040.37 ns/iter (1703375.00 … 2003208.00) | 1863000.00 ns | 1974750.00 ns | 1.03x slower |

## content matching; loc: 100000; pattern: 50%

| alias       | avg (min … max)                              | p75           | p99           | speed        |
| ----------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **indexOf** | 1763409.78 ns/iter (1630167.00 … 1874083.00) | 1782667.00 ns | 1857917.00 ns | 🔥 fastest   |
| exec        | 1792292.79 ns/iter (1700416.00 … 1922708.00) | 1807416.00 ns | 1889584.00 ns | 1.02x slower |
| matchAll    | 1822978.52 ns/iter (1698375.00 … 1969042.00) | 1841250.00 ns | 1946000.00 ns | 1.03x slower |

## content matching; loc: 100000; pattern: 90%

| alias    | avg (min … max)                              | p75           | p99           | speed        |
| -------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **exec** | 1790849.04 ns/iter (1668083.00 … 1934000.00) | 1805125.00 ns | 1917500.00 ns | 🔥 fastest   |
| indexOf  | 1791545.48 ns/iter (1669500.00 … 2950042.00) | 1794042.00 ns | 2281041.00 ns | 1.00x slower |
| matchAll | 1817368.09 ns/iter (1694542.00 … 1961042.00) | 1838792.00 ns | 1935959.00 ns | 1.01x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->
## node-RegExp.exec.ts
_[node-RegExp.exec.ts](pattern-matching/src)_
```ts
import {type LinePosition} from "../../../src/lib/shared/types.ts";

export default function getLineHits(content: string, pattern: RegExp): LinePosition[] {
    const hits = [];
    let match;

    while ((match = pattern.exec(content)) != null) {
        hits.push({startColumn: match.index, endColumn: match.index + match[0].length});
    }
    return hits;
}

```

## node-String.indexOf.ts
_[node-String.indexOf.ts](pattern-matching/src)_
```ts
import {type LinePosition} from "../../../src/lib/shared/types.ts";

export default function getLineHits(content: string, pattern: string): LinePosition[] {
    const hits = [];
    let index = content.indexOf(pattern);

    while (index !== -1) {
        hits.push({startColumn: index, endColumn: index + pattern.length});
        index = content.indexOf(pattern, index + 1);
    }
    return hits
}

```

## node-String.matchAll.ts
_[node-String.matchAll.ts](pattern-matching/src)_
```ts
import {type LinePosition} from "../../../src/lib/shared/types.ts";

export default function getLineHits(content: string, pattern: RegExp): LinePosition[] {
    return [...content.matchAll(pattern)].map(
        ({index = 0, 0: match = ''}) => ({
            startColumn: index,
            endColumn: index + match.length,
        })
    );
}

```

<!-- END CASES -->

<!-- START DATA -->
```bash
clk: ~3.42 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• content matching; loc: 100; pattern: 10%
------------------------------------------- -------------------------------
indexOf                      932.38 ns/iter 944.85 ns 977.10 ns ▁▂▂▂▂▂▅█▂▂▁
matchAll                       1.07 µs/iter   1.08 µs   1.12 µs ▁▁▁▁▂▂█▃▂▁▁
exec                         962.60 ns/iter 970.05 ns   1.01 µs ▁▁▂▁▁▃█▃▂▂▁

summary
  indexOf
   1.03x faster than exec
   1.15x faster than matchAll

• content matching; loc: 100; pattern: 50%
------------------------------------------- -------------------------------
indexOf                      940.18 ns/iter 947.52 ns 984.55 ns ▁▁▁▁▁▁█▅▂▁▁
matchAll                       1.07 µs/iter   1.08 µs   1.11 µs ▁▁▁▁▁▂█▄▂▂▁
exec                         962.82 ns/iter 970.36 ns   1.01 µs ▁▂▂▂▂▃█▃▃▁▁

summary
  indexOf
   1.02x faster than exec
   1.14x faster than matchAll

• content matching; loc: 100; pattern: 90%
------------------------------------------- -------------------------------
indexOf                      918.28 ns/iter 925.94 ns 961.98 ns ▁▁▂▂▂▂█▇▂▂▁
matchAll                       1.05 µs/iter   1.06 µs   1.09 µs ▁▁▁▂▁▂█▄▂▂▁
exec                         941.87 ns/iter 949.38 ns 975.36 ns ▁▁▁▂▁▁▂█▃▂▁

summary
  indexOf
   1.03x faster than exec
   1.15x faster than matchAll

• content matching; loc: 1000; pattern: 10%
------------------------------------------- -------------------------------
indexOf                       11.58 µs/iter  11.63 µs  11.73 µs ▅▃██▅█▅▆▃▁▃
matchAll                      12.02 µs/iter  12.11 µs  12.18 µs ▅█▃▆▁▃▅█▅▆▃
exec                          11.72 µs/iter  11.81 µs  11.86 µs ▂▂▄▂▁▅▄█▄▇▄

summary
  indexOf
   1.01x faster than exec
   1.04x faster than matchAll

• content matching; loc: 1000; pattern: 50%
------------------------------------------- -------------------------------
indexOf                       11.45 µs/iter  11.54 µs  11.64 µs ▃▃▆█▆▅▅█▃▅▃
matchAll                      12.00 µs/iter  12.14 µs  12.21 µs ▄█▁▄▇▁▄▄▂▇▂
exec                          11.62 µs/iter  11.73 µs  11.81 µs ▄▄▂▇▄▄▅▁█▄▂

summary
  indexOf
   1.02x faster than exec
   1.05x faster than matchAll

• content matching; loc: 1000; pattern: 90%
------------------------------------------- -------------------------------
indexOf                       11.30 µs/iter  11.36 µs  11.45 µs ▃▅▆▃▆▃██▅▃▅
matchAll                      11.87 µs/iter  11.94 µs  12.03 µs ▂▁▃▃▂█▅▃▃▅▂
exec                          12.07 µs/iter  12.05 µs  13.12 µs ▆█▃▂▂▂▁▁▁▁▄

summary
  indexOf
   1.05x faster than matchAll
   1.07x faster than exec

• content matching; loc: 10000; pattern: 10%
------------------------------------------- -------------------------------
indexOf                      170.17 µs/iter 172.13 µs 188.21 µs ▁▁▁▁▄█▅▂▁▁▁
matchAll                     192.33 µs/iter 205.21 µs 226.71 µs ▁▂▇▆▃▄▅█▃▂▂
exec                         172.18 µs/iter 173.83 µs 194.13 µs ▁▁▁▂▇█▂▁▁▁▁

summary
  indexOf
   1.01x faster than exec
   1.13x faster than matchAll

• content matching; loc: 10000; pattern: 50%
------------------------------------------- -------------------------------
indexOf                      170.45 µs/iter 172.63 µs 190.29 µs ▁▁▁▂▆█▄▁▂▁▁
matchAll                     193.19 µs/iter 205.25 µs 230.13 µs ▁▁▅▇▃▅▇█▃▂▁
exec                         172.03 µs/iter 173.96 µs 195.33 µs ▁▁▂▅█▆▂▁▁▁▁

summary
  indexOf
   1.01x faster than exec
   1.13x faster than matchAll

• content matching; loc: 10000; pattern: 90%
------------------------------------------- -------------------------------
indexOf                      168.17 µs/iter 170.25 µs 179.54 µs ▁▁▁▁▂▄██▃▁▁
matchAll                     191.44 µs/iter 203.13 µs 224.54 µs ▁▁▆▆▃▄▆█▃▁▁
exec                         171.72 µs/iter 172.96 µs 194.63 µs ▁▁▁▃██▂▂▁▁▁

summary
  indexOf
   1.02x faster than exec
   1.14x faster than matchAll

• content matching; loc: 100000; pattern: 10%
------------------------------------------- -------------------------------
indexOf                        1.82 ms/iter   1.86 ms   1.92 ms ▁▂▁▃██▅▅▆▄▂
matchAll                       1.86 ms/iter   1.90 ms   1.99 ms ▁▂▂▅█▆▆▄▄▂▁
exec                           1.81 ms/iter   1.83 ms   1.96 ms ▁▁▁▅█▅▂▂▂▂▁

summary
  exec
   1x faster than indexOf
   1.03x faster than matchAll

• content matching; loc: 100000; pattern: 50%
------------------------------------------- -------------------------------
indexOf                        1.79 ms/iter   1.81 ms   1.94 ms ▁▂▂█▇▆▃▃▂▂▁
matchAll                       1.84 ms/iter   1.85 ms   1.99 ms ▁▄██▅▂▂▂▂▂▁
exec                           1.82 ms/iter   1.84 ms   1.93 ms ▁▂▅█▆▄▄▃▃▂▁

summary
  indexOf
   1.01x faster than exec
   1.02x faster than matchAll

• content matching; loc: 100000; pattern: 90%
------------------------------------------- -------------------------------
indexOf                        1.79 ms/iter   1.80 ms   1.90 ms ▁▁▁▃█▇▃▂▁▂▁
matchAll                       1.85 ms/iter   1.87 ms   2.05 ms ▁▂▅█▆▃▂▂▁▁▁
exec                           1.80 ms/iter   1.82 ms   1.91 ms ▁▁▂█▇▄▃▂▂▁▁

summary
  indexOf
   1.01x faster than exec
   1.04x faster than matchAll

```

<!-- END DATA -->
