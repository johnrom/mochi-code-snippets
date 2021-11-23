import { getBasicTestFileJs } from './test-helpers/test-file-helpers';
import { removeCodeSnippets } from '../src/remove-code-snippets';

test('Removes Snippets: From JS', () => {
  expect(removeCodeSnippets('js', getBasicTestFileJs(), '\n'))
    .toMatchInlineSnapshot(`
    "export const basicTestFile = (args) => {
        let myStr = args.isHello ? 'hello' : 'goodbye';
        (() => {
            myStr = 'world';
        })();
        return myStr;
    };
    "
  `);
  expect(removeCodeSnippets('js', getBasicTestFileJs('\r\n'), '\r\n'))
    .toMatchInlineSnapshot(`
    "export const basicTestFile = (args) => {
        let myStr = args.isHello ? 'hello' : 'goodbye';
        (() => {
            myStr = 'world';
        })();
        return myStr;
    };
    "
  `);
});
