<!-- START HEADER -->
# access-line-sync
<!-- END HEADER -->

This benchmark explores various techniques available in **Node.js** accessing content line by line synchronously.

---

## Benchmark Requirements

- **Search file content:** The  content should get returned as `string`
    - **Iterate over lines:** The content should be accessible line by line

---


<!-- START OVERVIEW -->
The  node:String.split benchmark is the fastest.


## content access sync; loc: 100;

| alias                 | avg (min … max)                        | p75         | p99         | speed        |
| --------------------- | -------------------------------------- | ----------- | ----------- | ------------ |
| **node:String.split** | 4288.56 ns/iter (4216.87 … 4377.40)    | 4310.46 ns  | 4359.49 ns  | 🔥 fastest   |
| node:String.indexOf   | 10249.29 ns/iter (10157.71 … 10405.22) | 10291.35 ns | 10359.85 ns | 2.39x slower |

## content access sync; loc: 1000;

| alias                 | avg (min … max)                          | p75          | p99          | speed        |
| --------------------- | ---------------------------------------- | ------------ | ------------ | ------------ |
| **node:String.split** | 39987.98 ns/iter (39604.38 … 40731.12)   | 40048.02 ns  | 40222.11 ns  | 🔥 fastest   |
| node:String.indexOf   | 111274.73 ns/iter (99958.00 … 133500.00) | 111750.00 ns | 122250.00 ns | 2.78x slower |

## content access sync; loc: 10000;

| alias                 | avg (min … max)                            | p75          | p99           | speed        |
| --------------------- | ------------------------------------------ | ------------ | ------------- | ------------ |
| **node:String.split** | 425338.32 ns/iter (390459.00 … 477375.00)  | 430959.00 ns | 464958.00 ns  | 🔥 fastest   |
| node:String.indexOf   | 988666.87 ns/iter (926209.00 … 1090667.00) | 997041.00 ns | 1071625.00 ns | 2.32x slower |

## content access sync; loc: 100000;

| alias                 | avg (min … max)                                 | p75            | p99            | speed        |
| --------------------- | ----------------------------------------------- | -------------- | -------------- | ------------ |
| **node:String.split** | 4159129.90 ns/iter (4019250.00 … 4374709.00)    | 4194250.00 ns  | 4331500.00 ns  | 🔥 fastest   |
| node:String.indexOf   | 10250378.45 ns/iter (10087375.00 … 10556334.00) | 10326041.00 ns | 10528250.00 ns | 2.46x slower |

<!-- END OVERVIEW -->

---

<!-- START CASES -->
## node-String.indexOf.ts
_[node-String.indexOf.ts](access-line-sync/src)_
```ts
export default function* accessContent(content: string): Generator<string> {
    let start = 0;
    while (start < content.length) {
        const index = content.indexOf('\n', start);
        const line = index === -1 ? content.slice(start) : content.slice(start, index);
        yield line;
        if (index === -1) break;
        start = index + 1;
    }
}

```

## node-String.split.ts
_[node-String.split.ts](access-line-sync/src)_
```ts
export default function* accessContent(content: string): Generator<string> {
    for (const line of content.split('\n')) {
        yield line;
    }
}

```

<!-- END CASES -->

--- 

## Benchmark Results

<!-- START DATA -->
```bash
clk: ~3.53 GHz
cpu: Apple M2 Max
runtime: node 23.9.0 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• content access sync; loc: 100;
------------------------------------------- -------------------------------
node:String.split              4.36 µs/iter   4.38 µs   4.46 µs ▂▃██▃▃▃▃▂▁▁
node:String.indexOf           10.54 µs/iter  10.70 µs  10.79 µs ▅▄█▅▂▂▁▄▇▅▄

summary
  node:String.split
   2.42x faster than node:String.indexOf

• content access sync; loc: 1000;
------------------------------------------- -------------------------------
node:String.split             41.46 µs/iter  41.65 µs  42.03 µs ▃▁▁▁▆█▃▆▃▁▃
node:String.indexOf          113.01 µs/iter 114.04 µs 128.67 µs ▁▂▆█▅▂▂▁▁▁▁

summary
  node:String.split
   2.73x faster than node:String.indexOf

• content access sync; loc: 10000;
------------------------------------------- -------------------------------
node:String.split            446.30 µs/iter 456.88 µs 491.04 µs ▁▁▃▅█▆▅▄▂▁▁
node:String.indexOf            1.04 ms/iter   1.07 ms   1.15 ms ▁▁▅█▅▄▃▃▂▂▁

summary
  node:String.split
   2.34x faster than node:String.indexOf

• content access sync; loc: 100000;
------------------------------------------- -------------------------------
node:String.split              4.38 ms/iter   4.47 ms   4.73 ms ▂▃▅██▇▅▄▃▂▁
node:String.indexOf           10.47 ms/iter  10.55 ms  10.85 ms ▃█▆▄▄▄▃▂▁▂▂

summary
  node:String.split
   2.39x faster than node:String.indexOf

```

<!-- END DATA -->
