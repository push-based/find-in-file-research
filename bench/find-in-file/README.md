<!-- START HEADER -->
# find-in-file
<!-- END HEADER -->

Description: TBD

---

## Benchmark Requirements

- TBD

---

<!-- START OVERVIEW -->
The  sync benchmark is the fastest.


## find in file; loc: 100; regex: 10%

| alias    | avg (min … max)                           | p75          | p99          | speed         |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------- |
| **sync** | 14739.41 ns/iter (14518.19 … 14940.12)    | 14797.60 ns  | 14924.77 ns  | 🔥 fastest    |
| async    | 129210.37 ns/iter (106542.00 … 209250.00) | 136083.00 ns | 187291.00 ns | 8.77x slower  |
| stream   | 235334.50 ns/iter (195208.00 … 560041.00) | 243167.00 ns | 344958.00 ns | 15.97x slower |

## find in file; loc: 100; regex: 50%

| alias    | avg (min … max)                           | p75          | p99          | speed         |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------- |
| **sync** | 14974.74 ns/iter (14780.81 … 15246.45)    | 15080.31 ns  | 15209.01 ns  | 🔥 fastest    |
| async    | 141540.02 ns/iter (105458.00 … 336958.00) | 147792.00 ns | 232125.00 ns | 9.45x slower  |
| stream   | 235521.58 ns/iter (191541.00 … 325125.00) | 247000.00 ns | 312917.00 ns | 15.73x slower |

## find in file; loc: 100; regex: 100%

| alias    | avg (min … max)                           | p75          | p99          | speed         |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------- |
| **sync** | 14971.45 ns/iter (14732.99 … 15254.37)    | 15077.85 ns  | 15213.36 ns  | 🔥 fastest    |
| async    | 131125.32 ns/iter (100292.00 … 241208.00) | 135417.00 ns | 178875.00 ns | 8.76x slower  |
| stream   | 225454.26 ns/iter (187959.00 … 312083.00) | 234750.00 ns | 270708.00 ns | 15.06x slower |

## find in file; loc: 1000; regex: 10%

| alias    | avg (min … max)                           | p75          | p99          | speed        |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **sync** | 119803.59 ns/iter (103917.00 … 161125.00) | 123792.00 ns | 154542.00 ns | 🔥 fastest   |
| async    | 197340.35 ns/iter (159875.00 … 265125.00) | 209417.00 ns | 253000.00 ns | 1.65x slower |
| stream   | 668623.35 ns/iter (584916.00 … 850292.00) | 683959.00 ns | 807792.00 ns | 5.58x slower |

## find in file; loc: 1000; regex: 50%

| alias    | avg (min … max)                           | p75          | p99          | speed        |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **sync** | 118658.43 ns/iter (106000.00 … 176333.00) | 123542.00 ns | 148166.00 ns | 🔥 fastest   |
| async    | 200363.86 ns/iter (160042.00 … 339375.00) | 212666.00 ns | 263292.00 ns | 1.69x slower |
| stream   | 661658.15 ns/iter (596375.00 … 734583.00) | 676834.00 ns | 729958.00 ns | 5.58x slower |

## find in file; loc: 1000; regex: 100%

| alias    | avg (min … max)                           | p75          | p99          | speed        |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **sync** | 118333.56 ns/iter (105375.00 … 157375.00) | 123167.00 ns | 142917.00 ns | 🔥 fastest   |
| async    | 197311.82 ns/iter (158875.00 … 264750.00) | 211042.00 ns | 250584.00 ns | 1.67x slower |
| stream   | 662360.84 ns/iter (578458.00 … 756542.00) | 678083.00 ns | 737583.00 ns | 5.60x slower |

## find in file; loc: 10000; regex: 10%

| alias    | avg (min … max)                              | p75           | p99           | speed        |
| -------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **sync** | 1205226.86 ns/iter (1126250.00 … 1515375.00) | 1223125.00 ns | 1442375.00 ns | 🔥 fastest   |
| async    | 1303094.72 ns/iter (1108292.00 … 1520459.00) | 1399417.00 ns | 1495417.00 ns | 1.08x slower |
| stream   | 4742062.78 ns/iter (4221792.00 … 5236458.00) | 4932917.00 ns | 5215875.00 ns | 3.93x slower |

## find in file; loc: 10000; regex: 50%

| alias    | avg (min … max)                              | p75           | p99           | speed        |
| -------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **sync** | 1193263.82 ns/iter (1122125.00 … 1395042.00) | 1216750.00 ns | 1332292.00 ns | 🔥 fastest   |
| async    | 1300071.43 ns/iter (1104250.00 … 1570333.00) | 1396750.00 ns | 1525584.00 ns | 1.09x slower |
| stream   | 4853532.64 ns/iter (4263250.00 … 5458833.00) | 5106292.00 ns | 5432708.00 ns | 4.07x slower |

## find in file; loc: 10000; regex: 100%

| alias     | avg (min … max)                              | p75           | p99           | speed        |
| --------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **async** | 1234426.10 ns/iter (1097084.00 … 1532625.00) | 1295125.00 ns | 1466041.00 ns | 🔥 fastest   |
| sync      | 1250323.40 ns/iter (1133500.00 … 1493750.00) | 1283500.00 ns | 1450417.00 ns | 1.01x slower |
| stream    | 4754653.74 ns/iter (4139666.00 … 5344917.00) | 4975875.00 ns | 5295042.00 ns | 3.85x slower |

## find in file; loc: 100000; regex: 10%

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 12913984.71 ns/iter (12393250.00 … 13638375.00) | 13157042.00 ns | 13598209.00 ns | 🔥 fastest   |
| async    | 13303919.67 ns/iter (12494667.00 … 14184416.00) | 13630875.00 ns | 14177625.00 ns | 1.03x slower |
| stream   | 42732359.44 ns/iter (41127375.00 … 43879375.00) | 43492333.00 ns | 43808625.00 ns | 3.31x slower |

## find in file; loc: 100000; regex: 50%

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 13291038.70 ns/iter (12504000.00 … 14425750.00) | 13834625.00 ns | 14422792.00 ns | 🔥 fastest   |
| async    | 13612406.46 ns/iter (12730083.00 … 14500000.00) | 14067750.00 ns | 14484583.00 ns | 1.02x slower |
| stream   | 41511421.11 ns/iter (40488042.00 … 43808208.00) | 42375333.00 ns | 43624125.00 ns | 3.12x slower |

## find in file; loc: 100000; regex: 100%

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 12705458.82 ns/iter (12298166.00 … 13954209.00) | 12775709.00 ns | 13719583.00 ns | 🔥 fastest   |
| async    | 13239247.02 ns/iter (12414292.00 … 13840708.00) | 13496958.00 ns | 13800583.00 ns | 1.04x slower |
| stream   | 41768683.11 ns/iter (40985709.00 … 42550458.00) | 42019375.00 ns | 42486334.00 ns | 3.29x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->
## find-in-file.async.ts
_[find-in-file.async.ts](find-in-file/src)_
```ts
import type {SourceLocation} from "../../../src/lib/shared/types.ts";
import accessFile from "../../access-file/src/node-fs.promise.readFile.ts";
import accessContent from "../../access-line-sync/src/node-String.split.ts";
import getLineHits from "../../pattern-matching/src/node-String.indexOf.ts";

export default async function findInFile(
    file: string,
    searchPattern: string,
    bail = false,
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];
    const content = await accessFile(file);
    let startLine = 0;
    for (const line of accessContent(content)) {
        startLine++;
        getLineHits(line, searchPattern, bail).forEach((position) => {
            hits.push({
                file,
                position: {
                    startLine,
                    ...position,
                }
            });
        })
    }
    return hits;
}

```

## find-in-file.stream.ts
_[find-in-file.stream.ts](find-in-file/src)_
```ts
import type {SourceLocation} from "../../../src/lib/shared/types.ts";
import accessFile from "../../access-file/src/node-readline.ts";
import getLineHits from "../../pattern-matching/src/node-String.indexOf.ts";

export default async function findInFile(
    file: string,
    searchPattern: string,
    bail = false,
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];

    let startLine = 0;
    for await (const line of accessFile(file)) {
        startLine++;
        getLineHits(line, searchPattern, bail).forEach((position) => {
            hits.push({
                file,
                position: {
                    startLine,
                    ...position,
                }
            });
        })
    }
    return hits;
}

```

## find-in-file.sync.ts
_[find-in-file.sync.ts](find-in-file/src)_
```ts
import type {SourceLocation} from "../../../src/lib/shared/types.ts";
import accessFile from "../../access-file/src/node-fs.readFileSync.ts";
import accessContent from "../../access-line-sync/src/node-String.split.ts";
import getLineHits from "../../pattern-matching/src/node-String.indexOf.ts";

export default async function findInFile(
    file: string,
    searchPattern: string,
    bail = false,
): Promise<SourceLocation[]> {
    const hits: SourceLocation[] = [];
    const content = accessFile(file);
    let startLine = 0;
    for (const line of accessContent(content)) {
        startLine++;
        getLineHits(line, searchPattern, bail).forEach((position) => {
            hits.push({
                file,
                position: {
                    startLine,
                    ...position,
                }
            });
        })
    }
    return hits;
}

```

## get-hits.ts
_[get-hits.ts](find-in-file/src)_
```ts
import type {LinePosition} from "../../../src/lib/shared/types.ts";

export default function getLineHits(content: string, pattern: RegExp): LinePosition[] {
    const hits = [];
    let match;

    while ((match = pattern.exec(content)) != null) {
        hits.push({startColumn: match.index, endColumn: match.index + match[0].length});
    }
    return hits;
}

```

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.45 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• find in file; loc: 100; regex: 10%
------------------------------------------- -------------------------------
sync                          15.82 µs/iter  15.92 µs      █      ▃  █ █   
                      (15.49 µs … 16.00 µs)  16.00 µs ▆▁▁▁▁█▁▁▁▁▁▁█▆▆█▁█▁▆▆
                  gc(  1.16 ms …   2.66 ms)   2.14 kb (  2.14 kb…  2.18 kb)

async                        165.28 µs/iter 177.38 µs   ▄▆█▆▄▂             
                    (118.63 µs … 304.79 µs) 277.54 µs ▂▄██████▇▅▄▃▄▂▃▁▂▁▁▁▁
                  gc(  1.05 ms …   2.87 ms)  51.80 kb ( 46.16 kb…426.16 kb)

stream                       309.81 µs/iter 328.67 µs   ▂█▆▂               
                      (209.04 µs … 1.10 ms) 631.00 µs ▃█████▇▅▃▃▃▂▂▂▁▁▂▁▁▁▁
                  gc(  1.09 ms …   3.76 ms) 210.32 kb ( 85.57 kb…  1.21 mb)

summary
  sync
   10.45x faster than async
   19.58x faster than stream

• find in file; loc: 100; regex: 50%
------------------------------------------- -------------------------------
sync                          16.02 µs/iter  16.12 µs       █  █           
                      (15.84 µs … 16.25 µs)  16.21 µs █████▁█▁▁█▁█▁█████▁▁█
                  gc(  1.32 ms …   2.48 ms)   2.14 kb (  2.13 kb…  2.14 kb)

async                        168.81 µs/iter 184.88 µs    ▃▅▆█▅▃            
                    (123.33 µs … 268.92 µs) 243.29 µs ▂▄▇██████▆██▄▆▅▅▂▂▁▂▁
                  gc(  1.19 ms …   2.88 ms)  52.47 kb ( 23.57 kb…361.92 kb)

stream                       290.25 µs/iter 311.63 µs       ▃▅█▃▃▅         
                    (214.38 µs … 394.54 µs) 384.58 µs ▃▄▆▄▇▇████████▅▄▄▃▂▂▂
                  gc(  1.12 ms …   2.63 ms) 197.68 kb ( 23.84 kb…  1.03 mb)

summary
  sync
   10.53x faster than async
   18.11x faster than stream

• find in file; loc: 100; regex: 100%
------------------------------------------- -------------------------------
sync                          16.42 µs/iter  17.41 µs   ▃▃  █            ▃ 
                      (15.19 µs … 18.35 µs)  17.88 µs ▆▁██▆▁█▆▆▁▁▁▁▁▁▁▁▆▁█▆
                  gc(  1.24 ms …   3.30 ms)   2.14 kb (  2.13 kb…  2.16 kb)

async                        166.32 µs/iter 179.21 µs    ▆▄▆█▃  ▂          
                    (119.21 µs … 272.75 µs) 251.25 µs ▂▂▆████████▄▄▄▁▃▂▂▁▂▁
                  gc(  1.13 ms …   2.33 ms)  50.10 kb ( 14.42 kb…394.42 kb)

stream                       252.80 µs/iter 270.04 µs    ▆█▅▇▄▇▃▂          
                    (196.96 µs … 370.75 µs) 339.83 µs ▁▂█████████▇▇▅▆▃▃▃▃▂▂
                  gc(  1.09 ms …   2.36 ms) 194.02 kb (101.69 kb…409.74 kb)

summary
  sync
   10.13x faster than async
   15.39x faster than stream

• find in file; loc: 1000; regex: 10%
------------------------------------------- -------------------------------
sync                         133.87 µs/iter 142.42 µs  ▃▅█▄█▅              
                    (108.71 µs … 203.67 µs) 192.96 µs ▅███████▇▆▅▄▄▂▃▃▂▂▂▃▂
                  gc(  1.11 ms …   2.10 ms) 326.06 kb (182.80 kb…622.15 kb)

async                        222.96 µs/iter 237.17 µs     ▆▇▅▅▆▅█▆         
                    (169.63 µs … 345.58 µs) 290.25 µs ▂▃▄▆████████▇█▆▅▄▃▃▂▂
                  gc(  1.06 ms …   2.52 ms) 353.77 kb ( 10.74 kb…919.38 kb)

stream                       732.44 µs/iter 755.71 µs     ▂▂▃▆▆█▃▅         
                    (639.29 µs … 859.25 µs) 846.17 µs ▂▂▄▇█████████▇▆▄▄▄▂▂▂
                  gc(  1.09 ms …   2.40 ms)   1.38 mb (950.37 kb…  1.79 mb)

summary
  sync
   1.67x faster than async
   5.47x faster than stream

• find in file; loc: 1000; regex: 50%
------------------------------------------- -------------------------------
sync                         134.41 µs/iter 143.67 µs  ▅▇██▅               
                    (108.08 µs … 198.17 µs) 192.46 µs ▃████████▆▄▄▄▄▄▃▄▂▃▂▂
                  gc(  1.14 ms …   2.49 ms) 325.39 kb (221.52 kb…365.52 kb)

async                        208.85 µs/iter 223.00 µs      ▆█▃▃▂           
                    (161.08 µs … 299.63 µs) 285.21 µs ▂▄▆▇███████▇▅▅▃▃▃▂▂▂▂
                  gc(  1.07 ms …   2.10 ms) 354.33 kb ( 10.67 kb…  1.05 mb)

stream                       678.55 µs/iter 695.21 µs       ▇▅▄█▇▄▄        
                    (610.58 µs … 758.92 µs) 747.92 µs ▁▃▃▅▃▅█████████▆▅▄▃▃▂
                  gc(  1.07 ms …   2.19 ms)   1.37 mb (973.48 kb…  1.67 mb)

summary
  sync
   1.55x faster than async
   5.05x faster than stream

• find in file; loc: 1000; regex: 100%
------------------------------------------- -------------------------------
sync                         119.46 µs/iter 126.96 µs  ▂█▇█                
                    (104.29 µs … 184.71 µs) 161.63 µs ▂█████▄▃▄▆▆▅▄▂▂▁▂▁▁▁▁
                  gc(  1.16 ms …   2.79 ms) 322.83 kb (322.83 kb…323.02 kb)

async                        194.19 µs/iter 203.42 µs   █▄▂ ▇█▅▃           
                    (164.08 µs … 279.33 µs) 251.04 µs ▃▇████████▆▇▄▄▄▃▃▂▂▂▂
                  gc(  1.04 ms …   2.68 ms) 339.96 kb (  7.95 kb…871.66 kb)

stream                       674.53 µs/iter 690.88 µs       ▂▅▇█▇███▆      
                    (608.42 µs … 746.00 µs) 731.29 µs ▂▂▃▃▅▆███████████▅▄▃▃
                  gc(  1.04 ms …   2.31 ms)   1.38 mb (997.70 kb…  1.73 mb)

summary
  sync
   1.63x faster than async
   5.65x faster than stream

• find in file; loc: 10000; regex: 10%
------------------------------------------- -------------------------------
sync                           1.26 ms/iter   1.27 ms   ▆▆▆█▃▃             
                        (1.18 ms … 1.50 ms)   1.45 ms ▃▆██████▅▃▃▃▂▂▂▂▂▁▂▁▁
                  gc(  1.14 ms …   2.36 ms)   3.19 mb (  3.19 mb…  3.19 mb)

async                          1.34 ms/iter   1.43 ms    ▄  ▂       █▄     
                        (1.15 ms … 1.56 ms)   1.52 ms ▁▄█████▆▄▃▂▂▅▆████▆▂▂
                  gc(  1.06 ms …   2.67 ms)   4.58 mb (  3.26 mb…  5.50 mb)

stream                         4.86 ms/iter   4.98 ms       ▂ ▄█▆▇▅▄       
                        (4.37 ms … 5.46 ms)   5.39 ms ▂▂▂▅▆█████████▇▄▃▁▄▂▂
                  gc(  1.06 ms …   3.60 ms) 782.40 kb ( 64.81 kb…  1.36 mb)

summary
  sync
   1.07x faster than async
   3.87x faster than stream

• find in file; loc: 10000; regex: 50%
------------------------------------------- -------------------------------
sync                           1.28 ms/iter   1.33 ms  ▂█▇▅                
                        (1.17 ms … 1.56 ms)   1.51 ms ▂█████▅▆▃▅▆▃▅▅▃▅▂▂▂▁▁
                  gc(  1.15 ms …   2.75 ms)   3.19 mb (  3.19 mb…  3.19 mb)

async                          1.43 ms/iter   1.53 ms    ▆ ▄█▄ ▃▄ ▄  ▄     
                        (1.20 ms … 1.72 ms)   1.66 ms ▃▄▆██████████▇████▅█▃
                  gc(  1.12 ms …   2.78 ms)   4.48 mb (  3.29 mb…  5.50 mb)

stream                         5.00 ms/iter   5.24 ms     ▂█▂  ▂ ▇ ▅▅ ▃▂   
                        (4.37 ms … 5.59 ms)   5.57 ms ▂▃▇█████▇██████████▆▂
                  gc(  1.14 ms …   2.87 ms) 794.42 kb (105.35 kb…  1.56 mb)

summary
  sync
   1.12x faster than async
   3.92x faster than stream

• find in file; loc: 10000; regex: 100%
------------------------------------------- -------------------------------
sync                           1.36 ms/iter   1.42 ms    ▂ ▂ ▃▆▃█   ▂      
                        (1.19 ms … 1.58 ms)   1.55 ms ▃▄▅████████████▆█▃▂▃▂
                  gc(  1.15 ms …   3.00 ms)   3.16 mb (  3.16 mb…  3.16 mb)

async                          1.32 ms/iter   1.40 ms   ▃▄█ ▅  ▃           
                        (1.15 ms … 1.69 ms)   1.56 ms ▂████████████▆▆▆▆▄▂▃▂
                  gc(  1.06 ms …   3.07 ms)   4.44 mb (  3.19 mb…  5.44 mb)

stream                         4.89 ms/iter   5.12 ms   ▃ ▅▇█▄▄ ▂ ▆▄▇▇▂▂▄  
                        (4.31 ms … 5.53 ms)   5.42 ms ▂▆█▅█████▅██████████▄
                  gc(  1.11 ms …   3.15 ms) 753.63 kb ( 64.47 kb…  1.64 mb)

summary
  async
   1.03x faster than sync
   3.7x faster than stream

• find in file; loc: 100000; regex: 10%
------------------------------------------- -------------------------------
sync                          13.32 ms/iter  13.53 ms        ▅█▅▅▅     ▃   
                      (12.70 ms … 13.95 ms)  13.90 ms ▃▃▃█▄█▆█████▆███▄██▃▃
                  gc(  1.33 ms …   3.30 ms)  19.34 mb ( 19.34 mb… 19.35 mb)

async                         13.43 ms/iter  13.62 ms   ▂▆█▂▂ ██           
                      (12.89 ms … 14.24 ms)  14.24 ms ▅███████████▇▇▅▃▇▃▁▇▅
                  gc(  1.46 ms …   3.21 ms)  31.39 mb ( 31.33 mb… 31.45 mb)

stream                        42.18 ms/iter  42.46 ms   ▄            █     
                      (41.46 ms … 43.07 ms)  42.82 ms ▅▁██▅▁█▁█▁█▁████▅▅▅▁▅
                  gc(  1.23 ms …   2.53 ms)   9.76 mb (  9.57 mb…  9.86 mb)

summary
  sync
   1.01x faster than async
   3.17x faster than stream

• find in file; loc: 100000; regex: 50%
------------------------------------------- -------------------------------
sync                          12.81 ms/iter  12.92 ms     ▃ ▅█▆▆█   ▃      
                      (12.49 ms … 13.19 ms)  13.19 ms ▄█▃▄█▆█████▆▆▃█▄▄▄▆▆▃
                  gc(  1.32 ms …   2.92 ms)  19.34 mb ( 19.34 mb… 19.35 mb)

async                         13.22 ms/iter  13.32 ms   ▂   ▄█ ▂           
                      (12.90 ms … 13.75 ms)  13.69 ms ▂▇█▅▂▇██████▅▇▄▅▂▁▂▁▂
                  gc(  1.43 ms …   3.07 ms)  31.38 mb ( 31.33 mb… 31.43 mb)

stream                        41.72 ms/iter  41.95 ms            █▄   ▄    
                      (41.20 ms … 42.16 ms)  42.13 ms ██▅▁▅▁▁██▁▁██▁▁██▁█▅█
                  gc(  1.24 ms …   2.55 ms)   9.23 mb (  8.91 mb…  9.85 mb)

summary
  sync
   1.03x faster than async
   3.26x faster than stream

• find in file; loc: 100000; regex: 100%
------------------------------------------- -------------------------------
sync                          13.21 ms/iter  13.40 ms         █▇▂▄ ▂       
                      (12.56 ms … 13.91 ms)  13.90 ms ▅▄▂▅▅▂▆▆████▄█▄▄▄▅▅▂▂
                  gc(  1.33 ms …   2.89 ms)  18.87 mb ( 18.87 mb… 18.87 mb)

async                         13.38 ms/iter  13.54 ms          ▃   █▅▆     
                      (12.88 ms … 13.82 ms)  13.81 ms ▃▆▆▆▃▆████████████▃▄▃
                  gc(  1.45 ms …   3.17 ms)  30.91 mb ( 30.86 mb… 30.96 mb)

stream                        42.46 ms/iter  43.16 ms █  ▃  █ ▃  ▃     █  ▃
                      (41.22 ms … 43.79 ms)  43.66 ms █▆▁█▁▆█▆█▆▁█▆▆▆▆▆█▁▆█
                  gc(  1.26 ms …   2.85 ms)   8.88 mb (  8.79 mb…  8.97 mb)

summary
  sync
   1.01x faster than async
   3.21x faster than stream

```

<!-- END DATA -->
