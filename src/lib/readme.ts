import {md} from "build-md";
import {replaceMarkdownSection} from "./utils.ts";
import * as path from "path";
import type {BenchmarkData, MitataResult} from "./benchmarks.ts";
import type {trial} from "mitata";


export function updateReadme(readme: string, b: BenchmarkData) {

    readme = replaceMarkdownSection(readme, 'HEADER', md.heading(1, b.folder).toString());
    readme = replaceMarkdownSection(readme, 'OVERVIEW', createMitataTables(b.benchmark.json));

    const cases = b.cases.map((c) => {
        let caseContent = md.heading(2, path.basename(c.filename)).toString() + '\n';
        caseContent += md.italic(md.link(path.join(b.folder, 'src'), path.basename(c.filename)).toString()).toString() + '\n';
        caseContent += md.codeBlock('ts', c.content).toString() + '\n';
        return caseContent;
    }).join('\n');

    readme = replaceMarkdownSection(readme, 'CASES', cases);

    return replaceMarkdownSection(readme, 'DATA', md.codeBlock('bash', b.benchmark.mitata).toString() + '\n');
}
// helper.ts
// A collection of small, pure helper functions used by the main createMitataTables function.

/**
 * Numeric formatter – returns a string with two decimals.
 */
export function fmt(num: number): string {
    return num.toFixed(2);
}

/**
 * Extract the group name from the layout, falling back to an empty string if missing.
 */
export function getGroupName(layout: Array<{ name: string | null }>, groupIndex: number): string {
    const entry = layout[groupIndex];
    return entry?.name?.trim() ?? '';
}

/**
 * Group benchmarks by their .group index.
 */
export function groupBenchmarks(benchmarks: any[]): Record<number, any[]> {
    const benchesByGroup: Record<number, any[]> = {};
    for (const bench of benchmarks) {
        const g = bench.group;
        if (!benchesByGroup[g]) {
            benchesByGroup[g] = [];
        }
        benchesByGroup[g].push(bench);
    }
    return benchesByGroup;
}

/**
 * Sort an array of benchmarks by ascending average time (the "fastest" first).
 */
export function sortBenchmarksByFastest(benches: any[]): any[] {
    return [...benches].sort((a, b) => {
        const aAvg = a.runs?.[0]?.stats?.avg ?? Number.POSITIVE_INFINITY;
        const bAvg = b.runs?.[0]?.stats?.avg ?? Number.POSITIVE_INFINITY;
        return aAvg - bAvg;
    });
}

export function buildGroupRows(benches: any[]): string[][] {
    if (!benches.length) return [];

    // The fastest bench is at [0] after sorting
    const fastestStats = benches[0].runs?.[0]?.stats;
    const fastestAvg = fastestStats?.avg ?? 1;

    const rows: string[][] = [];
    for (const bench of benches) {
        const stats = bench.runs?.[0]?.stats;
        if (!stats) continue;

        const alias = bench.alias;
        const avg = stats.avg;
        const minVal = stats.min;
        const maxVal = stats.max;
        const p75 = stats.p75;
        const p99 = stats.p99;

        const avgMinMax = `${fmt(avg)} ns/iter (${fmt(minVal)} … ${fmt(maxVal)})`;
        const p75Part = `${fmt(p75)} ns`;
        const p99Part = `${fmt(p99)} ns`;

        const ratio = avg / fastestAvg;
        const speed = ratio <= 1.000001 ? '🔥 fastest' : `${ratio.toFixed(2)}x slower`;

        rows.push([
            speed.endsWith('fastest') ? `**${alias}**` : `${alias}`,
            avgMinMax,
            p75Part,
            p99Part,
            speed
        ]);
    }
    return rows;
}

export function createMitataTables(data: any): string {
    const { layout, benchmarks } = data;

    // 1) Group benchmarks by .group
    const benchesByGroup = groupBenchmarks(benchmarks);

    // 2) Sort group indices numerically so we process them in ascending order
    const sortedGroupIndices = Object.keys(benchesByGroup)
        .map(Number)
        .sort((a, b) => a - b);

    let output = md.paragraph(`The  ${getGlobalFastest(benchmarks).alias} benchmark is the fastest.`).toString()+ '\n\n';

    // 3) For each group, build and append one table
    for (const groupIdx of sortedGroupIndices) {
        const groupName = getGroupName(layout, groupIdx);
        const groupBenches = benchesByGroup[groupIdx] || [];
        if (!groupBenches.length) continue;

        // Sort by fastest first
        const sortedBenches = sortBenchmarksByFastest(groupBenches);

        // Build table rows
        const rows = buildGroupRows(sortedBenches);
        if (!rows.length) continue;

        // If there's a group name, print it as a heading
        if (groupName) {
            output += `\n## ${groupName}\n\n`;
        }

        // Build the markdown table
        output += md.table(
            ['alias', 'avg (min … max)', 'p75', 'p99', 'speed'],
            rows
        ) + '\n';
    }

    return output;
}

export function getGlobalFastest(benchmarks: MitataResult['benchmarks']): trial {
    let fastestBench:MitataResult['benchmarks'][number]  = null;
    let fastestAvg = Number.POSITIVE_INFINITY;

    for (const bench of benchmarks) {
        const avg = bench.runs?.[0]?.stats?.avg;
        if (typeof avg === 'number' && avg < fastestAvg) {
            fastestAvg = avg;
            fastestBench = bench;
        }
    }

    return fastestBench;
}
