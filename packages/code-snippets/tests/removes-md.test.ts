import { getBasicTestFileMd } from './test-helpers/test-file-helpers';
import { removeCodeSnippets } from '../src/remove-code-snippets';

test('Removes Snippets: From MD.', () => {
  expect(removeCodeSnippets('md', getBasicTestFileMd(), '\n'))
    .toMatchInlineSnapshot(`
    "# This tests snippets in markdown.


    This snippet is surrounded by apostrophes.



    This snippet is surrounded by parentheses.

    "
  `);
  expect(removeCodeSnippets('md', getBasicTestFileMd('\r\n'), '\r\n'))
    .toMatchInlineSnapshot(`
    "# This tests snippets in markdown.


    This snippet is surrounded by apostrophes.



    This snippet is surrounded by parentheses.

    "
  `);
});
