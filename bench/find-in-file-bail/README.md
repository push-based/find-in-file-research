<!-- START HEADER -->
# find-in-file-bail
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
| **sync** | 14879.73 ns/iter (14574.71 … 15080.79)    | 14982.11 ns  | 15011.56 ns  | 🔥 fastest    |
| async    | 131302.24 ns/iter (107750.00 … 352166.00) | 135916.00 ns | 220958.00 ns | 8.82x slower  |
| stream   | 233885.22 ns/iter (187125.00 … 581083.00) | 241292.00 ns | 326459.00 ns | 15.72x slower |

## find in file; loc: 100; regex: 30%

| alias    | avg (min … max)                           | p75          | p99          | speed         |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------- |
| **sync** | 14928.51 ns/iter (14800.97 … 15079.26)    | 14966.18 ns  | 15046.54 ns  | 🔥 fastest    |
| async    | 52190.41 ns/iter (51345.02 … 52659.84)    | 52504.95 ns  | 52654.49 ns  | 3.50x slower  |
| stream   | 227121.45 ns/iter (189833.00 … 305166.00) | 236666.00 ns | 280916.00 ns | 15.21x slower |

## find in file; loc: 100; regex: 60%

| alias    | avg (min … max)                           | p75          | p99          | speed         |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------- |
| **sync** | 14937.52 ns/iter (14701.33 … 15158.75)    | 15002.91 ns  | 15100.74 ns  | 🔥 fastest    |
| async    | 131665.29 ns/iter (107250.00 … 263334.00) | 135708.00 ns | 205459.00 ns | 8.81x slower  |
| stream   | 225649.38 ns/iter (180583.00 … 305042.00) | 235209.00 ns | 278875.00 ns | 15.11x slower |

## find in file; loc: 1000; regex: 10%

| alias    | avg (min … max)                           | p75          | p99          | speed        |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **sync** | 117769.79 ns/iter (104292.00 … 218916.00) | 119000.00 ns | 169750.00 ns | 🔥 fastest   |
| async    | 196908.39 ns/iter (163041.00 … 336666.00) | 207500.00 ns | 260916.00 ns | 1.67x slower |
| stream   | 676939.54 ns/iter (611458.00 … 774791.00) | 694292.00 ns | 752292.00 ns | 5.75x slower |

## find in file; loc: 1000; regex: 30%

| alias    | avg (min … max)                           | p75          | p99          | speed        |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **sync** | 114067.20 ns/iter (105334.00 … 141583.00) | 116333.00 ns | 133250.00 ns | 🔥 fastest   |
| async    | 197515.01 ns/iter (157834.00 … 315250.00) | 207291.00 ns | 258917.00 ns | 1.73x slower |
| stream   | 680852.69 ns/iter (614875.00 … 780917.00) | 699500.00 ns | 752416.00 ns | 5.97x slower |

## find in file; loc: 1000; regex: 60%

| alias    | avg (min … max)                           | p75          | p99          | speed        |
| -------- | ----------------------------------------- | ------------ | ------------ | ------------ |
| **sync** | 112233.53 ns/iter (103125.00 … 149792.00) | 114583.00 ns | 133500.00 ns | 🔥 fastest   |
| async    | 198700.95 ns/iter (165708.00 … 340584.00) | 208833.00 ns | 270375.00 ns | 1.77x slower |
| stream   | 681451.99 ns/iter (600750.00 … 793167.00) | 701333.00 ns | 742125.00 ns | 6.07x slower |

## find in file; loc: 10000; regex: 10%

| alias    | avg (min … max)                              | p75           | p99           | speed        |
| -------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **sync** | 1228261.32 ns/iter (1128833.00 … 1509208.00) | 1250791.00 ns | 1426334.00 ns | 🔥 fastest   |
| async    | 1335628.80 ns/iter (1108125.00 … 1528083.00) | 1414417.00 ns | 1487792.00 ns | 1.09x slower |
| stream   | 4925906.52 ns/iter (4465417.00 … 5473916.00) | 5035583.00 ns | 5430042.00 ns | 4.01x slower |

## find in file; loc: 10000; regex: 30%

| alias    | avg (min … max)                              | p75           | p99           | speed        |
| -------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **sync** | 1225073.39 ns/iter (1139625.00 … 1375625.00) | 1249584.00 ns | 1352709.00 ns | 🔥 fastest   |
| async    | 1345313.16 ns/iter (1135916.00 … 1564417.00) | 1425292.00 ns | 1516000.00 ns | 1.10x slower |
| stream   | 4904379.50 ns/iter (4306708.00 … 5489417.00) | 5158625.00 ns | 5484625.00 ns | 4.00x slower |

## find in file; loc: 10000; regex: 60%

| alias    | avg (min … max)                              | p75           | p99           | speed        |
| -------- | -------------------------------------------- | ------------- | ------------- | ------------ |
| **sync** | 1232499.31 ns/iter (1145792.00 … 1382792.00) | 1248959.00 ns | 1364375.00 ns | 🔥 fastest   |
| async    | 1333495.73 ns/iter (1124958.00 … 1558625.00) | 1424334.00 ns | 1516500.00 ns | 1.08x slower |
| stream   | 4926958.27 ns/iter (4356833.00 … 5484709.00) | 5163542.00 ns | 5462292.00 ns | 4.00x slower |

## find in file; loc: 100000; regex: 10%

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 12589332.92 ns/iter (12239500.00 … 12957084.00) | 12732791.00 ns | 12936125.00 ns | 🔥 fastest   |
| async    | 12816789.23 ns/iter (12412709.00 … 13217625.00) | 12951416.00 ns | 13196709.00 ns | 1.02x slower |
| stream   | 42794017.00 ns/iter (42138834.00 … 43568125.00) | 42980167.00 ns | 43516500.00 ns | 3.40x slower |

## find in file; loc: 100000; regex: 30%

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 12758139.66 ns/iter (12463625.00 … 13127834.00) | 12863417.00 ns | 13127708.00 ns | 🔥 fastest   |
| async    | 12926234.20 ns/iter (12587542.00 … 13463833.00) | 13047125.00 ns | 13385667.00 ns | 1.01x slower |
| stream   | 42806608.57 ns/iter (42139625.00 … 43518791.00) | 43204500.00 ns | 43516125.00 ns | 3.36x slower |

## find in file; loc: 100000; regex: 60%

| alias    | avg (min … max)                                 | p75            | p99            | speed        |
| -------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **sync** | 12645223.31 ns/iter (12238375.00 … 13071250.00) | 12770458.00 ns | 13069458.00 ns | 🔥 fastest   |
| async    | 13017748.49 ns/iter (12623625.00 … 13408667.00) | 13165041.00 ns | 13407375.00 ns | 1.03x slower |
| stream   | 42846259.30 ns/iter (42494208.00 … 43322458.00) | 43040917.00 ns | 43296250.00 ns | 3.39x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.52 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• find in file; loc: 100; regex: 10%
------------------------------------------- -------------------------------
sync                          15.20 µs/iter  15.26 µs  15.36 µs ▅▁█▃▁▅▃▆▅▃▃
async                        130.58 µs/iter 136.42 µs 180.71 µs ▁▄▅▇█▃▂▁▁▁▁
stream                       237.61 µs/iter 242.63 µs 454.25 µs ▁▇█▃▁▁▁▁▁▁▁

summary
  sync
   8.59x faster than async
   15.63x faster than stream

• find in file; loc: 100; regex: 30%
------------------------------------------- -------------------------------
sync                          15.19 µs/iter  15.24 µs  15.40 µs ▃▃▁▆█▃██▃▃▃
async                         52.02 µs/iter  52.29 µs  52.45 µs ▅▁█▅█▅▅▁▅▅▅
stream                       225.75 µs/iter 234.04 µs 281.79 µs ▁▂▆██▆▃▂▂▁▁

summary
  sync
   3.42x faster than async
   14.86x faster than stream

• find in file; loc: 100; regex: 60%
------------------------------------------- -------------------------------
sync                          15.18 µs/iter  15.23 µs  15.47 µs ▅▅▁█▃█▃▅▁▁▃
async                        131.78 µs/iter 137.08 µs 177.33 µs ▂▃▅██▄▂▁▁▁▁
stream                       225.69 µs/iter 234.29 µs 282.96 µs ▁▁▅▆█▆▃▂▁▁▁

summary
  sync
   8.68x faster than async
   14.87x faster than stream

• find in file; loc: 1000; regex: 10%
------------------------------------------- -------------------------------
sync                         115.95 µs/iter 117.96 µs 144.79 µs ▂▇█▆▃▂▂▂▁▁▁
async                        200.49 µs/iter 210.58 µs 258.13 µs ▂▅▇██▅▄▃▂▁▁
stream                       676.85 µs/iter 694.88 µs 756.88 µs ▁▂▃▄██▇▅▂▂▁

summary
  sync
   1.73x faster than async
   5.84x faster than stream

• find in file; loc: 1000; regex: 30%
------------------------------------------- -------------------------------
sync                         115.17 µs/iter 117.33 µs 148.17 µs ▂▆█▅▃▂▁▁▁▁▁
async                        197.91 µs/iter 206.33 µs 241.92 µs ▁▄▄▇█▆▃▃▃▁▁
stream                       675.22 µs/iter 693.04 µs 763.58 µs ▁▂▄▅█▆▅▃▂▁▁

summary
  sync
   1.72x faster than async
   5.86x faster than stream

• find in file; loc: 1000; regex: 60%
------------------------------------------- -------------------------------
sync                         113.92 µs/iter 116.38 µs 135.88 µs ▂▆▇█▅▃▂▁▁▁▁
async                        200.80 µs/iter 211.71 µs 254.58 µs ▁▃▅██▅▄▃▂▁▁
stream                       674.89 µs/iter 692.38 µs 752.08 µs ▁▁▂▃▆█▇▄▃▂▁

summary
  sync
   1.76x faster than async
   5.92x faster than stream

• find in file; loc: 10000; regex: 10%
------------------------------------------- -------------------------------
sync                           1.24 ms/iter   1.25 ms   1.37 ms ▁▂▅█▅▄▂▂▂▁▁
async                          1.35 ms/iter   1.44 ms   1.55 ms ▂▄▆▄▄▂▅█▆▂▂
stream                         4.80 ms/iter   5.04 ms   5.28 ms ▂▄▇▅▅▅█▄▆▆▃

summary
  sync
   1.09x faster than async
   3.88x faster than stream

• find in file; loc: 10000; regex: 30%
------------------------------------------- -------------------------------
sync                           1.24 ms/iter   1.26 ms   1.41 ms ▂▇█▆▄▃▂▂▂▁▁
async                          1.34 ms/iter   1.44 ms   1.51 ms ▂▃▆▅▄▄▃▄█▆▂
stream                         4.78 ms/iter   5.04 ms   5.30 ms ▂▃▇▇▇▅▇▄█▅▃

summary
  sync
   1.08x faster than async
   3.86x faster than stream

• find in file; loc: 10000; regex: 60%
------------------------------------------- -------------------------------
sync                           1.25 ms/iter   1.27 ms   1.42 ms ▂▆█▆▃▃▂▂▁▁▁
async                          1.34 ms/iter   1.44 ms   1.55 ms ▂▄█▅▃▃▅█▆▃▁
stream                         4.80 ms/iter   5.04 ms   5.40 ms ▂▄▄▇█▇▇█▆▄▂

summary
  sync
   1.07x faster than async
   3.84x faster than stream

• find in file; loc: 100000; regex: 10%
------------------------------------------- -------------------------------
sync                          12.77 ms/iter  12.89 ms  13.21 ms ▅▆▆█▆▄▅▃▁▃▁
async                         13.20 ms/iter  13.34 ms  13.69 ms ▅▆▇▇█▇▅▅▃▃▂
stream                        41.23 ms/iter  41.38 ms  41.67 ms ▂▅▂▃▆█▅▇▂▁▃

summary
  sync
   1.03x faster than async
   3.23x faster than stream

• find in file; loc: 100000; regex: 30%
------------------------------------------- -------------------------------
sync                          12.87 ms/iter  12.99 ms  13.37 ms ▂▅▆▇██▄▄▃▂▃
async                         13.22 ms/iter  13.36 ms  13.89 ms ▂▄▅█▆█▃▃▂▁▁
stream                        41.06 ms/iter  41.19 ms  41.48 ms ▄▇▂█▅▅▇▂▄▄▂

summary
  sync
   1.03x faster than async
   3.19x faster than stream

• find in file; loc: 100000; regex: 60%
------------------------------------------- -------------------------------
sync                          13.03 ms/iter  13.21 ms  14.28 ms ▁▅█▆▄▃▂▁▁▁▁
async                         13.41 ms/iter  13.50 ms  15.23 ms ▂█▇▅▂▂▁▁▁▁▁
stream                        41.24 ms/iter  41.41 ms  41.71 ms ▄▂▂▆█▄▂▂▅▂▂

summary
  sync
   1.03x faster than async
   3.17x faster than stream

```

<!-- END DATA -->
