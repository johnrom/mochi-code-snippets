import {
  PluginOptions,
  RemarkPluginCodeSnippets,
} from '@nmbl/remark-code-snippets';
import { remark } from 'remark';
import path from 'path';

const testArgs: PluginOptions = {
  eol: '\n',
  extractSnippets: false,
  removeSnippets: false,
  removeDuplicateEmptyNewlines: 'always',
};

const GatsbyRemarkPluginCodeSnippets = require('../src/index');

jest.mock('@nmbl/remark-code-snippets');

// need to return a function
(RemarkPluginCodeSnippets as any).mockResolvedValue(() => {});

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
