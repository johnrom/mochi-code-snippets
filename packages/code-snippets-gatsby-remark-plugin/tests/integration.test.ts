import { PluginOptions } from '@nmbl/code-snippets-remark-plugin';
import { remark } from 'remark';
import path from 'path';

const testArgs: PluginOptions = {
  eol: '\n',
  extractSnippets: false,
  removeSnippets: false,
  removeDuplicateEmptyNewlines: 'always',
};

const CodeSnippetsGatsbyRemarkPlugin = require('../src/index');
const {
  RemarkPluginCodeSnippets: CodeSnippetsRemarkPlugin,
} = require('@nmbl/code-snippets-remark-plugin');

jest.mock('@nmbl/code-snippets-remark-plugin', () => ({
  RemarkPluginCodeSnippets: jest.fn().mockImplementation(() => jest.fn()),
}));

test('Correctly instantiates underlying remark plugin.', () => {
  const markdownAST = remark.parse('');

  CodeSnippetsGatsbyRemarkPlugin(
    {
      markdownAST,
      markdownNode: {
        // just give it a real file
        fileAbsolutePath: path.resolve(__dirname, 'src/index.js'),
      },
    },
    testArgs
  );

  expect(CodeSnippetsRemarkPlugin).toHaveBeenCalledWith(testArgs);
});
