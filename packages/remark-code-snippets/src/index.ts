import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Root } from 'mdast';
import { EOL } from 'os';
import {
  extractCodeSnippet,
  removeCodeSnippets,
  removeDuplicateEmptyNewlines,
} from '@nmbl/code-snippets';

interface PluginOptions {
  eol?: string;
  extractSnippets?: boolean;
  removeSnippets?: boolean;
  removeDuplicateEmptyNewlines?: boolean | 'always';
}

export const RemarkPluginCodeSnippets: Plugin<
  (PluginOptions | undefined)[],
  Root
> = (options) => {
  const {
    eol = EOL,
    extractSnippets = true,
    removeSnippets = true,
    removeDuplicateEmptyNewlines: configRemoveDuplicateEmptyNewlines = false,
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

          node.value = extractCodeSnippet(
            node.lang,
            node.value,
            snippetId,
            eol
          );
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
