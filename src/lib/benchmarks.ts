import type {trial} from "mitata";

export interface MitataResult {
    layout: LayoutEntry[];
    benchmarks: trial[];
    context: MitataContext;
}

/**
 * Represents one entry from the `layout` array.
 */
export interface LayoutEntry {
    name: string | null;
    types: string[];
}

/**
 * Each run in a trial holds stats, arguments, etc.
 */
export interface RunEntry {
    stats: Stats | null;
    args: Record<string, unknown>;
    name: string;  // e.g. "node:String.indexOf"
}

/**
 * Stats object for each run, typically in `stats`.
 */
export interface Stats {
    kind: string;            // e.g. "yield"
    debug: string;           // might be empty
    samples: number[] | null;
    min: number;
    max: number;
    p25: number;
    p50: number;
    p75: number;
    p99: number;
    p999?: number;           // optional
    avg: number;
    ticks: number;
    heap?: HeapStats;
    gc?: GCStats;
}

/**
 * Heap usage stats within `Stats`.
 */
export interface HeapStats {
    _: number;          // e.g. 379
    total: number;      // e.g. 106156.8046875
    min: number;        // e.g. 6.1484375
    max: number;        // e.g. 402.236328125
    avg: number;        // e.g. 280.0971099934037
}

/**
 * GC stats within `Stats`.
 */
export interface GCStats {
    total: number;      // e.g. 569821116.9999938
    min: number;        // e.g. 937375
    max: number;        // e.g. 2424042
    avg: number;        // e.g. 1097921.2273602963
}

/**
 * Context metadata for the benchmark run, typically in `context`.
 */
export interface MitataContext {
    now: number;
    arch: string;        // e.g. "arm64-darwin"
    version: string;     // e.g. "23.9.0"
    runtime: string;     // e.g. "node"
    cpu: {
        name: string;      // e.g. "Apple M2 Max"
        freq: number;      // e.g. 3.38402449649524
    };
    noop?: {
        fn?: Stats;
        iter?: Stats;
        fn_gc?: Stats;
        // possibly other keys
    };
}

export type BenchmarkData = {
    folder: string,
    benchmark: {
        json:  MitataResult,
        mitata: string
    },
    readme: string,
    cases: {
        filename: string,
        content: string,
    }[]
}
