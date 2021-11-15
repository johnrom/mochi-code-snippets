import { remark } from 'remark';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remarkCodeImportPlugin = require('remark-code-import');
import { RemarkCodeImportSnippetsPlugin } from '../src';
import path from 'path';

const createCodeBlock = (file: string) => `
\`\`\`js file=./fixtures/${file}}
\`\`\`
`;

test('JS Snippet: Start', () => {
  expect(
    remark()
      .use(remarkCodeImportPlugin, {})
      .use(RemarkCodeImportSnippetsPlugin, {})
      .processSync({
        contents: createCodeBlock('basic-test-file.js@'),
        path: path.resolve('test.md'),
      })
      .toString()
  ).toMatchInlineSnapshot();
});
