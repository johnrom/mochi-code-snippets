import { getBasicTestFileJs } from './test-helpers/test-file-helpers';
import { extractCodeSnippet } from '../src/extract-code-snippet';

test('Extracts Snippets: From JS', () => {
  expect(extractCodeSnippet('js', getBasicTestFileJs(), 'start-file', '\n'))
    .toMatchInlineSnapshot(`
    "// @snippet:start start-fn
    export const basicTestFile = (args) => {"
  `);
  expect(extractCodeSnippet('js', getBasicTestFileJs(), 'start-fn', '\n'))
    .toMatchInlineSnapshot(`
    "export const basicTestFile = (args) => {
        // @snippet:end start-file
        // @snippet:start with-comment check it out!
        let myStr = args.isHello ? 'hello' : 'goodbye';
        // @snippet:start start-iife
        (() => {
            myStr = 'world';"
  `);
  expect(extractCodeSnippet('js', getBasicTestFileJs(), 'start-iife', '\n'))
    .toMatchInlineSnapshot(`
    "    (() => {
            myStr = 'world';"
  `);
  expect(extractCodeSnippet('js', getBasicTestFileJs(), 'end', '\n'))
    .toMatchInlineSnapshot(`
    "    return myStr;
    };
    "
  `);
  expect(
    extractCodeSnippet('js', getBasicTestFileJs('\r\n'), 'start-file', '\r\n')
  ).toMatchInlineSnapshot(`
    "// @snippet:start start-fn
    export const basicTestFile = (args) => "
  `);
  expect(
    extractCodeSnippet('js', getBasicTestFileJs('\r\n'), 'start-fn', '\r\n')
  ).toMatchInlineSnapshot(`
    "export const basicTestFile = (args) => {
        // @snippet:end start-file
        // @snippet:start with-comment check it out!
        let myStr = args.isHello ? 'hello' : 'goodbye';
        // @snippet:start start-iife
        (() => {
            myStr = 'world'"
  `);
  expect(
    extractCodeSnippet('js', getBasicTestFileJs('\r\n'), 'start-iife', '\r\n')
  ).toMatchInlineSnapshot(`
    "    (() => {
            myStr = 'world'"
  `);
  expect(extractCodeSnippet('js', getBasicTestFileJs('\r\n'), 'end', '\r\n'))
    .toMatchInlineSnapshot(`
    "    return myStr;
    };
    "
  `);
});
