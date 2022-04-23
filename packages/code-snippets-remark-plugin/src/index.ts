import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';
import { EOL } from 'os';
import {
  extractCodeSnippet,
  removeCodeSnippets,
  removeDuplicateEmptyNewlines,
} from '@nmbl/code-snippets';

export interface PluginOptions {
  eol?: string;
  extractSnippets?: boolean;
  removeSnippets?: boolean;
  removeDuplicateEmptyNewlines?: boolean | 'always';
  throwOnMissingSnippet?: boolean;
}

const CodeSnippetsRemarkPlugin: Plugin<(PluginOptions | undefined)[], Root> = (
  options
) => {
  const {
    eol = EOL,
    extractSnippets = true,
    removeSnippets = true,
    removeDuplicateEmptyNewlines: configRemoveDuplicateEmptyNewlines = false,
    throwOnMissingSnippet = true,
  } = options ?? {};
  return (tree) => {
    visit(tree, 'code', (node) => {
      const codeAttributes = node.meta?.split(' ');
      let processed = false;

      if (node.lang && extractSnippets) {
        const fileAttribute = codeAttributes?.find((meta) =>
          meta.startsWith('snippet=')
        );

        if (fileAttribute) {
          const snippetId = /^snippet=(?<snippetId>\S+)$/.exec(fileAttribute)
            ?.groups?.snippetId;

          if (!snippetId) {
            return;
          }

          let snippet = extractCodeSnippet(
            node.lang,
            node.value,
            snippetId,
            eol
          );

          if (typeof snippet === 'undefined') {
            if (throwOnMissingSnippet) {
              throw new Error(
                `@nmbl/code-snippets-remark-plugin: SnippetId does not exist: '${snippetId}'`
              );
            }
          }

          node.value = snippet ?? '';

          processed = true;
        }
      }

      if (
        node.lang &&
        removeSnippets &&
        !codeAttributes?.find((meta) => meta === 'preserve-snippets')
      ) {
        node.value = removeCodeSnippets(node.lang, node.value, eol);
        processed = true;
      }

      const isConfiguredToRemoveDuplicateNewlines =
        configRemoveDuplicateEmptyNewlines === 'always' ||
        (processed && configRemoveDuplicateEmptyNewlines);

      if (
        isConfiguredToRemoveDuplicateNewlines &&
        !codeAttributes?.find((meta) => meta === 'preserve-newlines')
      ) {
        node.value = removeDuplicateEmptyNewlines(node.value, eol);
      }
    });
  };
};

export default CodeSnippetsRemarkPlugin;
