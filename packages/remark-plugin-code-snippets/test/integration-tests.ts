import { remark } from 'remark';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RemarkCodeImportPlugin = require('remark-code-import');
import { RemarkPluginCodeSnippets } from '../src';
import path from 'path';

const createCodeBlock = (file: string) => `
\`\`\`js file=./fixtures/${file}}
\`\`\`
`;

test('Works with `remark-code-import`', () => {
  expect(
    remark()
      .use(RemarkCodeImportPlugin, {})
      .use(RemarkPluginCodeSnippets, {})
      .processSync({
        contents: createCodeBlock('basic-test-file.js@'),
        path: path.resolve('test.md'),
      })
      .toString()
  ).toMatchInlineSnapshot();
});
