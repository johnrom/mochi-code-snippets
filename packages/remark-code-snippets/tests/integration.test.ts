import { getBasicTestFileJs } from './test-helpers/test-file-helpers';
import { RemarkPluginCodeSnippets } from '../src/index';
import { remark } from 'remark';
import path from 'path';

/**
 * Todo: this should be a separate package, like `code-snippets-test-helpers`
 * maybe using [https://github.com/TrySound/rollup-plugin-string/issues/28](rollup-plugin-string).
 */
const getMarkdown = (atts?: string, eol: string = '\n') => `
\`\`\`js${atts ? ` ${atts}` : ''}
${getBasicTestFileJs(eol)}
\`\`\`
`;

test('Extracts snippets by default.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
      })
      .processSync(getMarkdown('snippet=start-fn'))
      .toString()
  ).toMatchInlineSnapshot(``);
});
