import * as fs from "node:fs/promises";
import * as fsSync from "node:fs";
import * as path from "node:path";
import {ensureDirectoryExists, removeDirectoryIfExists} from "./file-system.ts";
import {LOC_RANGES} from "./constants.ts";
import type {ctx, trial} from "mitata";
const CONCURRENCY_LIMIT = 5;

export function fileName(baseDir: string, loc: number): string {
    return path.join(baseDir, `${loc}-loc.txt`);
}

async function runWithLimitedConcurrency(tasks: (() => Promise<void>)[], limit = CONCURRENCY_LIMIT): Promise<void> {
    const executing = new Set<Promise<void>>();

    for (const task of tasks) {
        const p = task().then(() => executing.delete(p));
        executing.add(p);

        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }

    await Promise.all(executing);
}

export async function setupLocFiles(folder: string) {
    await removeDirectoryIfExists(folder);
    await ensureDirectoryExists(folder);

    const tasks = LOC_RANGES.map((loc) => async () => {
        const filePath = path.join(folder, `${loc}-loc.txt`);
        await writeToFileStream(filePath, loc);
    });

    await runWithLimitedConcurrency(tasks);
}

const writeToFileStream = async (filePath: string, totalLines = 400, lineLength = 80) => {
    const halfLength = Math.floor(lineLength / 2);
    const chars = '-'.repeat(halfLength);
    const stream = fsSync.createWriteStream(filePath, { flags: 'w' });

    for (let i = 1; i <= totalLines; i++) {
        const percent = Math.floor((i * 100) / totalLines);
        const line = `- ${percent}% - start-${i} [${chars}] mid-${i} [${chars}] end-${i}\n`;

        if (!stream.write(line)) {
            await new Promise((resolve) => stream.once('drain', resolve));
        }

        if (i % 1000 === 0) {
            global.gc?.();  // Force GC for every 1000 lines
        }
    }

    stream.end();
    await new Promise((resolve) => stream.on('finish', resolve));
};

export async function generateTestFiles(baseDir: string, {
    levels = 1,
    subDirs = 1,
    filesPerDir = 1,
    totalLines = 100,
    lineLength = 80
}: {
    levels?: number;
    subDirs?: number;
    filesPerDir?: number;
    totalLines?: number;
    lineLength?: number;
} = {}): Promise<void> {

    const processDirsSequentially = async (dir: string, level: number): Promise<void> => {
        if (level > levels) return;

        for (let i = 0; i < subDirs; i++) {
            const subDirPath = path.join(dir, `subdir_${i + 1}`);
            await fs.mkdir(subDirPath, { recursive: true });

            for (let j = 0; j < filesPerDir; j++) {
                const filePath = path.join(subDirPath, `file_${j + 1}.txt`);
                await writeToFileStream(filePath, totalLines, lineLength);
            }

            await processDirsSequentially(subDirPath, level + 1);
        }
    };

    await fs.mkdir(baseDir, { recursive: true });

    for (let j = 0; j < filesPerDir; j++) {
        const filePath = path.join(baseDir, `file_${j + 1}.txt`);
        await writeToFileStream(filePath, totalLines, lineLength);
    }

    await processDirsSequentially(baseDir, 1);
}

export async function runAndSave(filePath: string, run: () => Promise<{ context: ctx, benchmarks: trial[] }>) {
    const {benchmarks}: { context: ctx, benchmarks: trial[] } = await run();
    await fs.writeFile(filePath, JSON.stringify(benchmarks, null, 2));
}
