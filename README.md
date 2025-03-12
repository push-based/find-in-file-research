# Find in Files - Benchmark

### Overview Benchmarks

- [Access file](./bench/file-access/README.md) - Read file and provide access to the lines of content
- [Pattern matching](./bench/content-matching/README.md) - Find multiple occurrences of a pattern and its [`LinePosition`](./src/lib/types.ts)
- [Find pattern in file](./bench/find-in-file/README.md) - Find multiple occurrences of a pattern it a file and its [`SourcePosition`](./src/lib/types.ts)
  - [with bail options](./bench/find-in-file-bail/README.md) - bail out after first hit.
- Path matching - Find all files which path matches a glob and its file path
- [Find files](./bench/find-files/README.md) - Find all files which path matches a glob and its file path
- [Access Files](./bench/access-files/README.md) - Read multiple files and provide access to the lines of content
- [Find pattern in files](./bench/find-in-files/README.md) - Find all files which path matches a glob and get all occurrences of a pattern and its [`SourceLocation`](./src/lib/types.ts)

