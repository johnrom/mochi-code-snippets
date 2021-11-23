import { getBasicTestFileTs } from './test-helpers/test-file-helpers';
import { removeCodeSnippets } from '../src/remove-code-snippets';

test('Removes Snippets: From JS', () => {
  expect(removeCodeSnippets('ts', getBasicTestFileTs(), '\n'))
    .toMatchInlineSnapshot(`
    "
    // comments above interfaces disappear during compilation
    interface BasicTestFileArgs {
      isHello: true;
    }
    export const basicTestFile = (args: BasicTestFileArgs) => {
      let myStr = args.isHello ? 'hello' : 'goodbye';

      (() => {
        myStr = 'world';
      })();

      return myStr;
    };
    "
  `);
  expect(removeCodeSnippets('ts', getBasicTestFileTs('\r\n'), '\r\n'))
    .toMatchInlineSnapshot(`
    "
    // comments above interfaces disappear during compilation
    interface BasicTestFileArgs {
      isHello: true;
    }
    export const basicTestFile = (args: BasicTestFileArgs) => {
      let myStr = args.isHello ? 'hello' : 'goodbye';

      (() => {
        myStr = 'world';
      })();

      return myStr;
    };
    "
  `);
});
