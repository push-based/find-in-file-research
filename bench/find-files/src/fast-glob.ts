import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fastGlob = require('fast-glob');

export default async function findFiles(
    globP: string,
baseDir: string,
): Promise<string[]> {
    return fastGlob.sync(globP, {cwd: baseDir});
}
