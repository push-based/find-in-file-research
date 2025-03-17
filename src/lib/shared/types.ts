export type Pattern = `${number}%` | `start-${number}` | `mid-{number}` | `end-{number}`;

export type LinePosition = {
    startColumn: number;
    endColumn?: number;
};

export type SourcePosition = {
    startLine: number;
    endLine?: number;
} & LinePosition;

export type SourceLocation = {
    file: string,
    position: SourcePosition
};

