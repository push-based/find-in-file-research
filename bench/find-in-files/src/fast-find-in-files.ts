import {type FastFindInFiles, fastFindInFiles} from 'fast-find-in-files';

export default async function findInFiles(directory: string, needle: string): Promise<FastFindInFiles[]> {
    return fastFindInFiles({
        directory,
        needle
    });
}
