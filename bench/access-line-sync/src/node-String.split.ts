export default function* accessContent(content: string): Generator<string> {
    for (const line of content.split('\n')) {
        yield line;
    }
}
