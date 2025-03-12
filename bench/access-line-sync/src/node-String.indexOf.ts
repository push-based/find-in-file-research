export default function* accessContent(content: string): Generator<string> {
    let start = 0;
    while (start < content.length) {
        const index = content.indexOf('\n', start);
        const line = index === -1 ? content.slice(start) : content.slice(start, index);
        yield line;
        if (index === -1) break;
        start = index + 1;
    }
}
