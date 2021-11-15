import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';
import { EOL } from 'os';
import { extractSnippet } from './helpers/extract-snippet';

interface PluginOptions {
  eol?: string;
}

export const RemarkCodeImportSnippetsPlugin: Plugin<PluginOptions[], Root> = (
  options: PluginOptions
) => {
  const { eol = EOL } = options;
  return async (tree) => {
    visit(tree, 'code', (node) => {
      const codeAttributes = node.meta?.split(' ');
      const fileAttribute = codeAttributes?.find((meta) =>
        meta.startsWith('file=')
      );

      if (!fileAttribute) {
        return;
      }

      const snippetId = /^file=(?:.+)(?:@(?<snippetId>\S+))?$/.exec(
        fileAttribute
      )?.groups?.snippetId;

      if (!snippetId) {
        return;
      }

      node.value = extractSnippet(node.value, snippetId, eol);
    });
  };
};
