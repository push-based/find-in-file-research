import * as fs from "node:fs/promises";
import * as fsSync from "node:fs";
import * as path from "node:path";
import {ensureDirectoryExists, removeDirectoryIfExists} from "./file-system.ts";
import {LOC_RANGES, README_TEMPLATE} from "./constants.ts";
import type {ctx, trial} from "mitata";

import {promisify} from 'util';

import {exec as execCb, spawn} from 'child_process';
import type {BenchmarkData} from "./benchmarks.ts";

const exec = promisify(execCb);

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
    const stream = fsSync.createWriteStream(filePath, {flags: 'w'});

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
            await fs.mkdir(subDirPath, {recursive: true});

            for (let j = 0; j < filesPerDir; j++) {
                const filePath = path.join(subDirPath, `file_${j + 1}.txt`);
                await writeToFileStream(filePath, totalLines, lineLength);
            }

            await processDirsSequentially(subDirPath, level + 1);
        }
    };

    await fs.mkdir(baseDir, {recursive: true});

    for (let j = 0; j < filesPerDir; j++) {
        const filePath = path.join(baseDir, `file_${j + 1}.txt`);
        await writeToFileStream(filePath, totalLines, lineLength);
    }

    await processDirsSequentially(baseDir, 1);
}

type MitataOpt = {
    throw?: boolean;
    filter?: RegExp;
    colors?: boolean;
    print?: (s: string) => any;
    observe?: (t: trial) => trial;

    format?:
        'json'
        | 'quiet'
        | 'mitata'
        | 'markdown'
        | { json: { debug?: boolean, samples?: boolean } }
        | { mitata: { name?: number | 'fixed' | 'longest' } }
}

export async function runWithConfig(run: (opt: MitataOpt) => Promise<{ context: ctx, benchmarks: trial[] }>, opt?: {
    format: Exclude<MitataOpt['format'], 'object'>
} & Pick<MitataOpt, 'colors'>): Promise<void> {
    const jsonFormat = {json: {debug: false, samples: false}};
    const {
        colors = (process.env.MITATA_COLORS ?? 'false') === 'true',
        format = (process.env.MITATA_FORMAT ?? 'mitata') as 'mitata' | 'json',
    } = opt ?? {};
    const cfg: MitataOpt = {
        throw: true,
        colors,
        format: format === 'json' ? jsonFormat : format,
    }

    await run(cfg);
}

export async function writeBenchmarksToFile(bench: string, opt?: {
    outputDir?: string;
    format?: 'json' | 'mitata';
}): Promise<void> {
    const benchName = path.basename(path.dirname(bench));
    const {outputDir = '.bench', format = 'mitata'} = opt ?? {};
    const ext = format === 'json' ? 'json' : 'txt';
    const benchFilename = `${benchName}.mitata.${ext}`;

    await ensureDirectoryExists(outputDir);

    const filePath = path.join(outputDir, benchFilename);
    const fileStream = fsSync.createWriteStream(filePath);

    await new Promise<void>((resolve, reject) => {
        const subprocess = spawn('node', ['--expose-gc', '--experimental-strip-types', bench], {
            env: {
                ...process.env,
                MITATA_FORMAT: format
            },
            stdio: ['ignore', 'pipe', 'inherit']
        });

        subprocess.stdout.pipe(fileStream);

        subprocess.on('close', (code) => {
            fileStream.close();
            if (code !== 0) {
                reject(new Error(`Benchmark process exited with code ${code}`));
            } else {
                console.log(`Benchmarks successfully written to ${filePath}`);
                resolve();
            }
        });

        subprocess.on('error', (error) => {
            fileStream.close();
            console.error(`ERROR: ${error}`);
            reject(error);
        });
    });
}

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceMarkdownSection(
    content: string,
    marker: string,
    newContent: string
): string {
    const START = `<!-- START ${marker} -->`;
    const END = `<!-- END ${marker} -->`;

    const sectionRegex = new RegExp(
        `${escapeRegExp(START)}[\\s\\S]*?${escapeRegExp(END)}`,
        'g'
    );

    const replacement = `${START}\n${newContent}\n${END}`;

    if (!sectionRegex.test(content)) {
        throw new Error(`Markers for section '${marker}' not found in file.`);
    }
    return content.replace(sectionRegex, replacement);
}

export function gatherBenchData(benchmarkFolders: string[]): BenchmarkData[] {
    return benchmarkFolders.map((folder) => {
        const folderPath = path.join(process.cwd(), 'bench', folder);
        const folderSrcPath = path.join(folderPath, 'src');
        const readmePath = path.join(folderPath, 'README.md');
        let readme = README_TEMPLATE;
        try {
            readme = fsSync.readFileSync(readmePath).toString();
        } catch (e) {
            console.log(`Initialized README.md found in ${folderPath}`);
            fsSync.writeFileSync(readmePath, readme);
        }

        return {
            folder,
            benchmark: {
                json: JSON.parse(fsSync.readFileSync(path.join('.bench', `${folder}.mitata.json`)).toString()),
                mitata: fsSync.readFileSync(path.join('.bench', `${folder}.mitata.txt`)).toString()
            },
            readme,
            cases: fsSync.readdirSync(folderSrcPath)
                .filter((f) => fsSync.statSync(path.join(folderSrcPath, f)).isFile())
                .map((filename) => {
                    const filePath = path.join(folderSrcPath, filename);
                    return {
                        filename: filePath,
                        content: fsSync.readFileSync(filePath).toString(),
                    }
                })
        }
    });

}

