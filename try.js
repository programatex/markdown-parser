const parser = require("./dist/index.js");
console.log(JSON.stringify(parser.md2ast(`
# Heading 1
## Heading 2

- abc
- \`def\`
  - *italic* and **bold**
  - _italic_ and __bold__
1. p
2. q
3. r
  4. s
  5. t
6. u

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

> a
> b
>> c
>> d
> e
> 
> \`\`\`
> console.log("Hi, World!");
> \`\`\`
> ff

`), null, "  "));
