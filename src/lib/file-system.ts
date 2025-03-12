import {mkdir, rm, stat} from 'node:fs/promises';
import {execSync} from 'node:child_process';
import * as fs from 'fs';
import * as path from 'path';

export async function directoryExists(filePath: string): Promise<boolean> {
    try {
        const stats = await stat(filePath);
        return stats.isDirectory();
    } catch {
        return false;
    }
}

export async function ensureDirectoryExists(baseDir: string) {
    try {
        await mkdir(baseDir, {recursive: true});
        return;
    } catch (error) {
        if ((error as { code: string }).code !== 'EEXIST') {
            throw error;
        }
    }
}

export async function removeDirectoryIfExists(dir: string) {
    if (await directoryExists(dir)) {
        await rm(dir, {recursive: true, force: true});
    }
}

export function countFiles(dir: string): number {
    const result = execSync(`find ${dir} -type f | wc -l`);
    return parseInt(result.toString().trim(), 10);
}
