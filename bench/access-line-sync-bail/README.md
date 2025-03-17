<!-- START HEADER -->
# access-line-sync-bail
<!-- END HEADER -->


This benchmark explores various techniques available in **Node.js** accessing content line by line synchronously and bail out at different stages.

---

## Benchmark Requirements

- **Search file content:** The  content should get returned as `string`
    - **Iterate over lines:** The content should be accessible line by line
    - **Bail:** If a content match occurs bail out early

---

<!-- START OVERVIEW -->
The  node:String.indexOf benchmark is the fastest.


## content access sync bail; loc: 100; patterns: - 10%

| alias                   | avg (min … max)                     | p75        | p99        | speed        |
| ----------------------- | ----------------------------------- | ---------- | ---------- | ------------ |
| **node:String.indexOf** | 1302.51 ns/iter (1233.82 … 1405.09) | 1316.55 ns | 1391.07 ns | 🔥 fastest   |
| node:String.split       | 2191.59 ns/iter (2090.97 … 2328.07) | 2224.05 ns | 2304.71 ns | 1.68x slower |

## content access sync bail; loc: 100; patterns: - 30%

| alias                 | avg (min … max)                     | p75        | p99        | speed        |
| --------------------- | ----------------------------------- | ---------- | ---------- | ------------ |
| **node:String.split** | 2736.27 ns/iter (2629.21 … 2833.53) | 2762.41 ns | 2819.96 ns | 🔥 fastest   |
| node:String.indexOf   | 3553.22 ns/iter (3462.55 … 3734.82) | 3567.22 ns | 3716.42 ns | 1.30x slower |

## content access sync bail; loc: 100; patterns: - 50%

| alias                 | avg (min … max)                     | p75        | p99        | speed        |
| --------------------- | ----------------------------------- | ---------- | ---------- | ------------ |
| **node:String.split** | 3411.64 ns/iter (3304.41 … 3598.73) | 3430.63 ns | 3591.84 ns | 🔥 fastest   |
| node:String.indexOf   | 5782.40 ns/iter (5714.76 … 5882.32) | 5802.27 ns | 5872.73 ns | 1.69x slower |

## content access sync bail; loc: 100; patterns: - 70%

| alias                 | avg (min … max)                     | p75        | p99        | speed        |
| --------------------- | ----------------------------------- | ---------- | ---------- | ------------ |
| **node:String.split** | 4007.32 ns/iter (3932.78 … 4163.02) | 4032.26 ns | 4148.34 ns | 🔥 fastest   |
| node:String.indexOf   | 7969.25 ns/iter (7881.67 … 8123.03) | 7991.71 ns | 8093.96 ns | 1.99x slower |

## content access sync bail; loc: 1000; patterns: - 10%

| alias                   | avg (min … max)                        | p75         | p99         | speed        |
| ----------------------- | -------------------------------------- | ----------- | ----------- | ------------ |
| **node:String.indexOf** | 11538.14 ns/iter (11363.40 … 11740.69) | 11638.33 ns | 11718.83 ns | 🔥 fastest   |
| node:String.split       | 17966.46 ns/iter (17688.08 … 18438.56) | 18065.30 ns | 18371.71 ns | 1.56x slower |

## content access sync bail; loc: 1000; patterns: - 30%

| alias                 | avg (min … max)                        | p75         | p99         | speed        |
| --------------------- | -------------------------------------- | ----------- | ----------- | ------------ |
| **node:String.split** | 23979.26 ns/iter (23824.88 … 24066.71) | 24022.76 ns | 24065.39 ns | 🔥 fastest   |
| node:String.indexOf   | 33794.93 ns/iter (33569.55 … 34275.46) | 33843.68 ns | 34172.09 ns | 1.41x slower |

## content access sync bail; loc: 1000; patterns: - 50%

| alias                 | avg (min … max)                        | p75         | p99         | speed        |
| --------------------- | -------------------------------------- | ----------- | ----------- | ------------ |
| **node:String.split** | 30267.77 ns/iter (30040.25 … 30536.21) | 30357.93 ns | 30428.63 ns | 🔥 fastest   |
| node:String.indexOf   | 56779.92 ns/iter (55938.40 … 59071.79) | 56464.70 ns | 58519.24 ns | 1.88x slower |

## content access sync bail; loc: 1000; patterns: - 70%

| alias                 | avg (min … max)                         | p75         | p99          | speed        |
| --------------------- | --------------------------------------- | ----------- | ------------ | ------------ |
| **node:String.split** | 37550.57 ns/iter (37050.72 … 38165.74)  | 37788.94 ns | 37943.42 ns  | 🔥 fastest   |
| node:String.indexOf   | 89693.72 ns/iter (82042.00 … 112708.00) | 91000.00 ns | 106459.00 ns | 2.39x slower |

## content access sync bail; loc: 10000; patterns: - 10%

| alias                   | avg (min … max)                           | p75          | p99          | speed        |
| ----------------------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **node:String.indexOf** | 126782.11 ns/iter (110708.00 … 244541.00) | 129208.00 ns | 202250.00 ns | 🔥 fastest   |
| node:String.split       | 232644.28 ns/iter (207250.00 … 321750.00) | 234125.00 ns | 257000.00 ns | 1.83x slower |

## content access sync bail; loc: 10000; patterns: - 30%

| alias                 | avg (min … max)                           | p75          | p99          | speed        |
| --------------------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **node:String.split** | 293200.29 ns/iter (260667.00 … 331833.00) | 295917.00 ns | 319834.00 ns | 🔥 fastest   |
| node:String.indexOf   | 343471.27 ns/iter (310208.00 … 392833.00) | 348042.00 ns | 379333.00 ns | 1.17x slower |

## content access sync bail; loc: 10000; patterns: - 50%

| alias                 | avg (min … max)                           | p75          | p99          | speed        |
| --------------------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **node:String.split** | 357986.69 ns/iter (322417.00 … 410167.00) | 362334.00 ns | 388042.00 ns | 🔥 fastest   |
| node:String.indexOf   | 570406.33 ns/iter (525125.00 … 683208.00) | 582500.00 ns | 647791.00 ns | 1.59x slower |

## content access sync bail; loc: 10000; patterns: - 70%

| alias                 | avg (min … max)                           | p75          | p99          | speed        |
| --------------------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **node:String.split** | 428346.11 ns/iter (387625.00 … 487167.00) | 437708.00 ns | 478083.00 ns | 🔥 fastest   |
| node:String.indexOf   | 792940.74 ns/iter (736333.00 … 880167.00) | 806625.00 ns | 861875.00 ns | 1.85x slower |

## content access sync bail; loc: 100000; patterns: - 10%

| alias                   | avg (min … max)                              | p75           | p99           | speed        |
| ----------------------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **node:String.indexOf** | 1122624.23 ns/iter (1030083.00 … 2594834.00) | 1139917.00 ns | 1252542.00 ns | 🔥 fastest   |
| node:String.split       | 2174142.74 ns/iter (2025084.00 … 2315791.00) | 2216416.00 ns | 2314125.00 ns | 1.94x slower |

## content access sync bail; loc: 100000; patterns: - 30%

| alias                 | avg (min … max)                              | p75           | p99           | speed        |
| --------------------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **node:String.split** | 2853556.08 ns/iter (2611917.00 … 3186042.00) | 2935333.00 ns | 3150333.00 ns | 🔥 fastest   |
| node:String.indexOf   | 3479420.70 ns/iter (3267333.00 … 3659583.00) | 3543333.00 ns | 3650750.00 ns | 1.22x slower |

## content access sync bail; loc: 100000; patterns: - 50%

| alias                 | avg (min … max)                              | p75           | p99           | speed        |
| --------------------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **node:String.split** | 3567185.27 ns/iter (3279208.00 … 3921125.00) | 3725167.00 ns | 3900541.00 ns | 🔥 fastest   |
| node:String.indexOf   | 5643067.75 ns/iter (5404042.00 … 5897667.00) | 5724791.00 ns | 5872250.00 ns | 1.58x slower |

## content access sync bail; loc: 100000; patterns: - 70%

| alias                 | avg (min … max)                              | p75           | p99           | speed        |
| --------------------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **node:String.split** | 4228412.21 ns/iter (3887584.00 … 4712750.00) | 4447250.00 ns | 4691750.00 ns | 🔥 fastest   |
| node:String.indexOf   | 7894336.50 ns/iter (7654166.00 … 8163875.00) | 7994750.00 ns | 8103792.00 ns | 1.87x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.43 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• content access sync bail; loc: 100; patterns: - 10%
------------------------------------------- -------------------------------
node:String.split              2.29 µs/iter   2.31 µs   2.34 µs ▁▂▅▄▅▆▇█▅▅▄
node:String.indexOf            1.35 µs/iter   1.36 µs   1.41 µs ▂▄▅▅█▇▃▅▃▂▁

summary
  node:String.indexOf
   1.7x faster than node:String.split

• content access sync bail; loc: 100; patterns: - 30%
------------------------------------------- -------------------------------
node:String.split              2.74 µs/iter   2.76 µs   2.82 µs ▂▃▅▆██▆▅▄▃▂
node:String.indexOf            3.71 µs/iter   3.75 µs   3.81 µs ▂▄▂▅▄█▆▇▅▆▂

summary
  node:String.split
   1.35x faster than node:String.indexOf

• content access sync bail; loc: 100; patterns: - 50%
------------------------------------------- -------------------------------
node:String.split              3.51 µs/iter   3.55 µs   3.62 µs ▅█▃▃█▅▅▂▄▃▂
node:String.indexOf            5.88 µs/iter   5.94 µs   6.10 µs ▆▆▇▇▆█▇▅▁▂▄

summary
  node:String.split
   1.67x faster than node:String.indexOf

• content access sync bail; loc: 100; patterns: - 70%
------------------------------------------- -------------------------------
node:String.split              4.02 µs/iter   4.05 µs   4.12 µs ▂▃▃▄█▂▆▅▂▁▂
node:String.indexOf            8.19 µs/iter   8.31 µs   8.40 µs ▂█▆▃▇▂▅▂▆▆▅

summary
  node:String.split
   2.04x faster than node:String.indexOf

• content access sync bail; loc: 1000; patterns: - 10%
------------------------------------------- -------------------------------
node:String.split             18.11 µs/iter  18.21 µs  18.26 µs ▃▆▃▁▃▁█▃▃█▃
node:String.indexOf           11.34 µs/iter  11.37 µs  11.44 µs █▃▂▃▅▃▅▃▂▂▂

summary
  node:String.indexOf
   1.6x faster than node:String.split

• content access sync bail; loc: 1000; patterns: - 30%
------------------------------------------- -------------------------------
node:String.split             24.21 µs/iter  24.26 µs  24.32 µs ▆▃▁▆▁▁▁█▁▁▃
node:String.indexOf           33.66 µs/iter  33.83 µs  33.87 µs ▅▁█▅▅▅▁▁▅██

summary
  node:String.split
   1.39x faster than node:String.indexOf

• content access sync bail; loc: 1000; patterns: - 50%
------------------------------------------- -------------------------------
node:String.split             30.82 µs/iter  30.93 µs  30.99 µs ▆▆▃▁▁▁▁█▃▃▃
node:String.indexOf           56.29 µs/iter  56.64 µs  56.94 µs ▃▃██▁▁▁▃▃▁▃

summary
  node:String.split
   1.83x faster than node:String.indexOf

• content access sync bail; loc: 1000; patterns: - 70%
------------------------------------------- -------------------------------
node:String.split             37.67 µs/iter  37.76 µs  37.97 µs ▅█▁▅▁▅██▅▁▅
node:String.indexOf           84.94 µs/iter  85.79 µs  95.88 µs ▁▁▁▁█▇▃▁▁▁▁

summary
  node:String.split
   2.26x faster than node:String.indexOf

• content access sync bail; loc: 10000; patterns: - 10%
------------------------------------------- -------------------------------
node:String.split            231.24 µs/iter 233.67 µs 251.46 µs ▁▁▁▁▄█▄▂▂▂▁
node:String.indexOf          118.16 µs/iter 119.00 µs 133.21 µs ▁▁▁▂█▅▂▁▁▁▁

summary
  node:String.indexOf
   1.96x faster than node:String.split

• content access sync bail; loc: 10000; patterns: - 30%
------------------------------------------- -------------------------------
node:String.split            295.62 µs/iter 297.63 µs 335.38 µs ▁▁▁▁█▅▂▁▁▁▁
node:String.indexOf          349.99 µs/iter 352.38 µs 378.83 µs ▁▁▁▁▂█▅▂▁▁▁

summary
  node:String.split
   1.18x faster than node:String.indexOf

• content access sync bail; loc: 10000; patterns: - 50%
------------------------------------------- -------------------------------
node:String.split            362.73 µs/iter 368.46 µs 391.58 µs ▁▁▁▁▆█▅▄▃▂▁
node:String.indexOf          564.82 µs/iter 573.21 µs 611.63 µs ▁▁▁▁█▆▄▃▂▂▁

summary
  node:String.split
   1.56x faster than node:String.indexOf

• content access sync bail; loc: 10000; patterns: - 70%
------------------------------------------- -------------------------------
node:String.split            424.12 µs/iter 428.92 µs 461.92 µs ▁▁▁▁▇█▄▃▂▂▁
node:String.indexOf          778.43 µs/iter 786.00 µs 850.88 µs ▁▁▁▅█▃▂▁▁▁▁

summary
  node:String.split
   1.84x faster than node:String.indexOf

• content access sync bail; loc: 100000; patterns: - 10%
------------------------------------------- -------------------------------
node:String.split              2.18 ms/iter   2.22 ms   2.36 ms ▁▆██▇▄▅▃▂▁▂
node:String.indexOf            1.11 ms/iter   1.12 ms   1.19 ms ▁▁█▆▄▃▂▂▁▁▁

summary
  node:String.indexOf
   1.97x faster than node:String.split

• content access sync bail; loc: 100000; patterns: - 30%
------------------------------------------- -------------------------------
node:String.split              2.84 ms/iter   2.90 ms   3.04 ms ▃█▄▃▄▇▅▅▃▂▁
node:String.indexOf            3.41 ms/iter   3.47 ms   3.59 ms ▃█▅▆▅▇▇▄▃▂▁

summary
  node:String.split
   1.2x faster than node:String.indexOf

• content access sync bail; loc: 100000; patterns: - 50%
------------------------------------------- -------------------------------
node:String.split              3.54 ms/iter   3.68 ms   3.85 ms ▃█▄▂▁▂▅▅▃▂▂
node:String.indexOf            5.50 ms/iter   5.58 ms   5.78 ms ▄█▆▄▃▃▃▃▂▁▁

summary
  node:String.split
   1.55x faster than node:String.indexOf

• content access sync bail; loc: 100000; patterns: - 70%
------------------------------------------- -------------------------------
node:String.split              4.33 ms/iter   4.54 ms   4.75 ms ▃█▆▄▂▂▆▅▆▄▂
node:String.indexOf            7.88 ms/iter   7.98 ms   8.13 ms ▂█▆▃▄▆▅▄▄▃▂

summary
  node:String.split
   1.82x faster than node:String.indexOf

```

<!-- END DATA -->
