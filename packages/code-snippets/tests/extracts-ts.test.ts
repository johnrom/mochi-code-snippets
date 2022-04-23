import { getBasicTestFileTs } from './test-helpers/test-file-helpers';
import { extractCodeSnippet } from '../src/extract-code-snippet';

test('Extracts Snippets: From TS', () => {
  expect(extractCodeSnippet('ts', getBasicTestFileTs(), 'start-file', '\n'))
    .toMatchInlineSnapshot(`
    "
    // comments above interfaces disappear during compilation
    interface BasicTestFileArgs {
      isHello: true;
    }
    // @snippet:start start-fn
    export const basicTestFile = (args: BasicTestFileArgs) => {"
  `);
  expect(extractCodeSnippet('ts', getBasicTestFileTs(), 'start-fn', '\n'))
    .toMatchInlineSnapshot(`
    "export const basicTestFile = (args: BasicTestFileArgs) => {
      // @snippet:end start-file
      // @snippet:start with-comment check it out!
      let myStr = args.isHello ? 'hello' : 'goodbye';

      // @snippet:start start-iife
      (() => {
        myStr = 'world';"
  `);
  expect(extractCodeSnippet('ts', getBasicTestFileTs(), 'start-iife', '\n'))
    .toMatchInlineSnapshot(`
    "  (() => {
        myStr = 'world';"
  `);
  expect(extractCodeSnippet('ts', getBasicTestFileTs(), 'end', '\n'))
    .toMatchInlineSnapshot(`
    "
      return myStr;
    };
    "
  `);
  expect(
    extractCodeSnippet('ts', getBasicTestFileTs('\r\n'), 'start-file', '\r\n')
  ).toMatchInlineSnapshot(`
    "
    // comments above interfaces disappear during compilation
    interface BasicTestFileArgs {
      isHello: true;
    }
    // @snippet:start start-fn
    export const basicTestFile = (args: BasicTestFileArgs) => {"
  `);
  expect(
    extractCodeSnippet('ts', getBasicTestFileTs('\r\n'), 'start-fn', '\r\n')
  ).toMatchInlineSnapshot(`
    "export const basicTestFile = (args: BasicTestFileArgs) => {
      // @snippet:end start-file
      // @snippet:start with-comment check it out!
      let myStr = args.isHello ? 'hello' : 'goodbye';

      // @snippet:start start-iife
      (() => {
        myStr = 'world';"
  `);
  expect(
    extractCodeSnippet('ts', getBasicTestFileTs('\r\n'), 'start-iife', '\r\n')
  ).toMatchInlineSnapshot(`
    "  (() => {
        myStr = 'world';"
  `);
  expect(extractCodeSnippet('ts', getBasicTestFileTs('\r\n'), 'end', '\r\n'))
    .toMatchInlineSnapshot(`
    "
      return myStr;
    };
    "
  `);
});
