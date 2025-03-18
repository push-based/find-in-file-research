import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const globSync = require('glob');

export default async function findFiles(
    globP: string,
    baseDir: string,
): Promise<string[]> {
    return globSync.sync(globP, {cwd: baseDir});
}
