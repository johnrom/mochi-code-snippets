import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';

interface PluginOptions {}

const RemarkCodeImportSnippetsJsTsPlugin: Plugin<PluginOptions[], Root> = (
  _options
) => {
  return async (tree, file) => {
    const transformations: Promise<void>[] = [];

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

      // snip() snip()
    });
  };
};

export default RemarkCodeImportSnippetsJsTsPlugin;
