import {
  getBasicTestFileJs,
  getBasicTestFileMd,
} from './test-helpers/test-file-helpers';
import { RemarkPluginCodeSnippets } from '../src/index';
import { remark } from 'remark';

/**
 * Todo: this should be a separate package, like `code-snippets-test-helpers`
 * maybe using [https://github.com/TrySound/rollup-plugin-string/issues/28](rollup-plugin-string).
 */
const getJsMarkdown = (atts?: string, eol: string = '\n') =>
  `\`\`\`js${atts ? ` ${atts}` : ''}${eol}${getBasicTestFileJs(
    eol
  )}${eol}\`\`\``;
const getMdMarkdown = (atts?: string, eol: string = '\n') =>
  `\`\`\`md${atts ? ` ${atts}` : ''}${eol}${getBasicTestFileMd(
    eol
  )}${eol}\`\`\``;
const getJsMarkdownWithoutExtension = (eol: string = '\n') =>
  `\`\`\`${eol}${getBasicTestFileJs(eol)}${eol}\`\`\``;
const getTonsOfNewlines = (eol: string = '\n') =>
  `\`\`\`${eol}Test Newlines${eol}${eol}${eol}${eol}/Test Newlines${eol}\`\`\``;

test("Doesn't affect extensionless blocks.", () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
      })
      .processSync(getJsMarkdownWithoutExtension())
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`
    // @snippet:start start-file
    // @snippet:start start-fn
    export const basicTestFile = (args) => {
        // @snippet:end start-file
        // @snippet:start with-comment check it out!
        let myStr = args.isHello ? 'hello' : 'goodbye';
        // @snippet:start start-iife
        (() => {
            myStr = 'world';
            // @snippet:end
        })();
        // @snippet:start end
        return myStr;
    };

    \`\`\`
    "
  `);
});

test('Extracts and removes snippets by default.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
      })
      .processSync(getJsMarkdown('snippet=start-fn'))
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`js snippet=start-fn
    export const basicTestFile = (args) => {
        let myStr = args.isHello ? 'hello' : 'goodbye';
        (() => {
            myStr = 'world';
    \`\`\`
    "
  `);
});

test('Works with custom EOL.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\r\n',
      })
      .processSync(getJsMarkdown('snippet=start-fn', '\r\n'))
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`js snippet=start-fn
    export const basicTestFile = (args) => {
        let myStr = args.isHello ? 'hello' : 'goodbye';
        (() => {
            myStr = 'world';
    \`\`\`
    "
  `);
});

test('Preserves snippets via configuration.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
        removeSnippets: false,
      })
      .processSync(getJsMarkdown('snippet=start-fn'))
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`js snippet=start-fn
    export const basicTestFile = (args) => {
        // @snippet:end start-file
        // @snippet:start with-comment check it out!
        let myStr = args.isHello ? 'hello' : 'goodbye';
        // @snippet:start start-iife
        (() => {
            myStr = 'world';
    \`\`\`
    "
  `);
});

test('Preserves snippets via code block metadata.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
      })
      .processSync(getJsMarkdown('snippet=start-fn preserve-snippets'))
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`js snippet=start-fn preserve-snippets
    export const basicTestFile = (args) => {
        // @snippet:end start-file
        // @snippet:start with-comment check it out!
        let myStr = args.isHello ? 'hello' : 'goodbye';
        // @snippet:start start-iife
        (() => {
            myStr = 'world';
    \`\`\`
    "
  `);
});

test('Removes snippets even when no snippet is configured.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
        extractSnippets: false,
      })
      .processSync(getJsMarkdown())
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`js
    export const basicTestFile = (args) => {
        let myStr = args.isHello ? 'hello' : 'goodbye';
        (() => {
            myStr = 'world';
        })();
        return myStr;
    };

    \`\`\`
    "
  `);
});

test("Doesn't extract snippets unless configured to.", () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
        extractSnippets: false,
      })
      .processSync(getJsMarkdown('snippet=start-fn'))
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`js snippet=start-fn
    export const basicTestFile = (args) => {
        let myStr = args.isHello ? 'hello' : 'goodbye';
        (() => {
            myStr = 'world';
        })();
        return myStr;
    };

    \`\`\`
    "
  `);
});

test('Removes duplicate newlines when configured.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
        removeDuplicateEmptyNewlines: true,
      })
      .processSync(getMdMarkdown())
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`md
    # This tests snippets in markdown.

    This snippet is surrounded by apostrophes.

    This snippet is surrounded by parentheses.


    \`\`\`
    "
  `);
});

test('Doesn\t remove newlines unless configured.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
      })
      .processSync(getMdMarkdown())
      .toString()
  ).toMatchInlineSnapshot(`
    "\`\`\`md
    # This tests snippets in markdown.


    This snippet is surrounded by apostrophes.



    This snippet is surrounded by parentheses.


    \`\`\`
    "
  `);
});

test('Doesn\t remove newlines when unprocessed by plugin by default.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
        removeSnippets: false,
        removeDuplicateEmptyNewlines: true,
      })
      .processSync(getTonsOfNewlines())
      .toString()
  ).toMatchInlineSnapshot(`
    "    Test Newlines



        /Test Newlines
    "
  `);
});

test('Removes duplicate newlines when unprocessed by plugin when configured.', () => {
  expect(
    remark()
      .use(RemarkPluginCodeSnippets, {
        eol: '\n',
        removeSnippets: false,
        removeDuplicateEmptyNewlines: 'always',
      })
      .processSync(getTonsOfNewlines())
      .toString()
  ).toMatchInlineSnapshot(`
    "    Test Newlines

        /Test Newlines
    "
  `);
});
