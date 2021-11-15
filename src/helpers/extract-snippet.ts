const anyEndRegex = `^\\s*// @snippet:end\\s*$`;

/**
 * This is a super basic prototype based off of `remark-code-import`.
 */
export const extractSnippet = (
  content: string,
  snippetId: string,
  eol: string
) => {
  // alphanumeric, dashes and underscores
  // otherwise, no match!
  if (!snippetId.match(/[A-Za-z0-9-_]+/)) {
    return '';
  }

  const startRegex = `^\\s*// @snippet:start ${snippetId}\\s*$`;
  const endRegex = `^\\s*// @snippet:end ${snippetId}\\s*$`;

  const snippetStart = content.search(new RegExp(startRegex, 'im'));

  // there must be a beginning, or no match
  if (snippetStart === -1) {
    return '';
  }

  let snippet = content.substr(snippetStart);
  let snippetEnd = snippet.search(new RegExp(endRegex, 'im'));

  // if no end for `snippetId`, check for one without an ID
  if (snippetEnd === -1) {
    snippetEnd = snippet.search(new RegExp(anyEndRegex, 'im'));
  }

  // if we found an end, slice it
  if (snippetEnd !== -1) {
    snippet = snippet.substr(0, snippetEnd);
  }

  // remove @snippet:start and trailing newline
  return snippet.split(eol).slice(1).join('\n');
};
