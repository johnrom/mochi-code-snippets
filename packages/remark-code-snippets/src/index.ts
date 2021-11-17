import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';
import { EOL } from 'os';
import { extractCodeSnippet } from '@nmbl/code-snippets';

interface PluginOptions {
  eol?: string;
}

export const RemarkPluginCodeSnippets: Plugin<PluginOptions[], Root> = (
  options: PluginOptions
) => {
  const { eol = EOL } = options;
  return async (tree) => {
    visit(tree, 'code', (node) => {
      const codeAttributes = node.meta?.split(' ');
      const fileAttribute = codeAttributes?.find((meta) =>
        meta.startsWith('snippet=')
      );

      if (!fileAttribute) {
        return;
      }

      const snippetId = /^snippet=(?<snippetId>\S+)$/.exec(fileAttribute)
        ?.groups?.snippetId;

      if (!snippetId) {
        return;
      }

      node.value = extractCodeSnippet(node.lang, node.value, snippetId, eol);
    });
  };
};
