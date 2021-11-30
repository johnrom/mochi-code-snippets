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
  extension: string,
  codeBlock: string,
  snippetId: string,
  eol: string
) => {
  // alphanumeric, dashes and underscores
  // otherwise, no match!
  if (!snippetId.match(snippetIdRegex)) {
    throw new Error(
      `@nmbl/code-snippets: SnippetId should only contain alphanumeric characters, dashes and underscores: '${snippetId}'`
    );
  }

  const regexDefinitions = getCodeSnippetRegexDefinitions(extension, snippetId);

  if (!regexDefinitions) {
    throw new Error(
      `@nmbl/code-snippets: The extension "${extension}" doesn't exist in our definitions. Feel free to open a PR to support your language of choice! A link to our repository is available in package.json.`
    );
  }

  for (let i = 0; i < regexDefinitions.length; i++) {
    const regexDefinition = regexDefinitions[i];

    const snippetStart = new RegExp(regexDefinition.start, 'im').exec(
      codeBlock
    );

    // there must be a beginning, or no match
    if (!snippetStart) {
      continue;
    }

    let snippet = codeBlock.substr(
      snippetStart.index + snippetStart[0].length + eol.length
    );
    let snippetEnd = new RegExp(regexDefinition.end, 'im').exec(snippet);

    // if no end for `snippetId`, check for one without an ID
    if (!snippetEnd) {
      snippetEnd = new RegExp(regexDefinition.emptyEnd, 'im').exec(snippet);
    }

    // if we found an end, slice it
    if (snippetEnd) {
      snippet = snippet.substr(0, snippetEnd.index - eol.length);
    }

    return snippet;
  }

  return undefined;
};
