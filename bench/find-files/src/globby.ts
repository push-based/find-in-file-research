
import { globbySync } from 'globby';

export default function findFiles(
    globP: string,
    baseDir: string,
): string[] {
    return globbySync(globP, {cwd: baseDir});
}
