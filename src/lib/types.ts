export type Pattern = `${number}%` | `start-${number}`| `mid-{number}`| `end-{number}`;

export type LineHit = {
    startColumn: number;
    endColumn: number;
};

export type FileHit = {
    file: string,
    position: {
        startLine: number;
        startColumn?: number;
        endLine?: number;
        endColumn?: number;
    }
};
