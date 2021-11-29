import { PluginOptions } from '@nmbl/remark-code-snippets';
import { remark } from 'remark';
import path from 'path';

const testArgs: PluginOptions = {
  eol: '\n',
  extractSnippets: false,
  removeSnippets: false,
  removeDuplicateEmptyNewlines: 'always',
};

const GatsbyRemarkPluginCodeSnippets = require('../src/index');
const { RemarkPluginCodeSnippets } = require('@nmbl/remark-code-snippets');

jest.mock('@nmbl/remark-code-snippets', () => ({
  RemarkPluginCodeSnippets: jest.fn().mockImplementation(() => jest.fn()),
}));

test('Correctly instantiates underlying remark plugin.', () => {
  const markdownAST = remark.parse('');

  GatsbyRemarkPluginCodeSnippets(
    {
      markdownAST,
      markdownNode: {
        // just give it a real file
        fileAbsolutePath: path.resolve(__dirname, 'src/index.js'),
      },
    },
    testArgs
  );

  expect(RemarkPluginCodeSnippets).toHaveBeenCalledWith(testArgs);
});
