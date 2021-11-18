import {
  getCodeSnippetRegexDefinitions,
  snippetIdRegexString,
} from './code-snippet-definitions';

const snippetIdRegex = new RegExp(`^${snippetIdRegexString}$`);

/**
 * Extract a code snippet from a code block with a given snippet ID.
 *
 * @param extension The extension type of the code, like 'md' or 'js'.
 * @param eol The end-of-line operator of the file, like \n or \r\n.
 */
export const extractCodeSnippet = (
  extension: string | null | undefined,
  codeBlock: string,
  snippetId: string,
  eol: string
) => {
  // alphanumeric, dashes and underscores
  // otherwise, no match!
  if (!snippetId.match(snippetIdRegex)) {
    throw new Error(
      'Code Snippets: SnippetId should only contain alphanumeric characters, dashes and underscores.'
    );
  }

  const regexDefinitions = getCodeSnippetRegexDefinitions(extension, snippetId);

  for (let i = 0; i < regexDefinitions.length; i++) {
    const regexDefinition = regexDefinitions[i];

    const snippetStart = codeBlock.search(
      new RegExp(regexDefinition.start, 'im')
    );

    // there must be a beginning, or no match
    if (snippetStart === -1) {
      continue;
    }

    let snippet = codeBlock.substr(snippetStart);
    let snippetEnd = snippet.search(new RegExp(regexDefinition.end, 'im'));

    // if no end for `snippetId`, check for one without an ID
    if (snippetEnd === -1) {
      snippetEnd = snippet.search(new RegExp(regexDefinition.emptyEnd, 'im'));
    }

    // if we found an end, slice it
    if (snippetEnd !== -1) {
      snippet = snippet.substr(0, snippetEnd);
    }

    // remove @snippet:start and trailing newline
    return snippet.split(eol).slice(1).join('\n');
  }

  return '';
};
