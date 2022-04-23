import { getBasicTestFileMd } from './test-helpers/test-file-helpers';
import { extractCodeSnippet } from '../src/extract-code-snippet';

test('Extract Snippets: From MD with apostrophes.', () => {
  expect(
    extractCodeSnippet('md', getBasicTestFileMd(), 'apos-with-comment', '\n')
  ).toMatchInlineSnapshot(`
    "[comment]: # '@snippet:start apostrophe'

    This snippet is surrounded by apostrophes.

    [comment]: # '@snippet:end apostrophe'"
  `);
  expect(extractCodeSnippet('md', getBasicTestFileMd(), 'apostrophe', '\n'))
    .toMatchInlineSnapshot(`
    "
    This snippet is surrounded by apostrophes.
    "
  `);
  expect(
    extractCodeSnippet(
      'md',
      getBasicTestFileMd('\r\n'),
      'apos-with-comment',
      '\r\n'
    )
  ).toMatchInlineSnapshot(`
    "[comment]: # '@snippet:start apostrophe'

    This snippet is surrounded by apostrophes.

    [comment]: # '@snippet:end apostrophe'"
  `);
  expect(
    extractCodeSnippet('md', getBasicTestFileMd('\r\n'), 'apostrophe', '\r\n')
  ).toMatchInlineSnapshot(`
    "
    This snippet is surrounded by apostrophes.
    "
  `);
});

test('Extract Snippets: From MD with parentheses.', () => {
  expect(
    extractCodeSnippet('md', getBasicTestFileMd(), 'parens-with-comment', '\n')
  ).toMatchInlineSnapshot(`
    "[comment]: # (@snippet:start parentheses)

    This snippet is surrounded by parentheses.

    [comment]: # (@snippet:end parentheses)"
  `);
  expect(extractCodeSnippet('md', getBasicTestFileMd(), 'parentheses', '\n'))
    .toMatchInlineSnapshot(`
    "
    This snippet is surrounded by parentheses.
    "
  `);
  expect(
    extractCodeSnippet(
      'md',
      getBasicTestFileMd('\r\n'),
      'parens-with-comment',
      '\r\n'
    )
  ).toMatchInlineSnapshot(`
    "[comment]: # (@snippet:start parentheses)

    This snippet is surrounded by parentheses.

    [comment]: # (@snippet:end parentheses)"
  `);
  expect(
    extractCodeSnippet('md', getBasicTestFileMd('\r\n'), 'parentheses', '\r\n')
  ).toMatchInlineSnapshot(`
    "
    This snippet is surrounded by parentheses.
    "
  `);
});
