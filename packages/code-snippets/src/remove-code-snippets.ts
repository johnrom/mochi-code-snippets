export const removeCodeSnippets = (content: string, eol: string) => {
  const startRegex = new RegExp(`^\\s*// @snippet:start.*${eol}?`, 'ig');
  const endRegex = new RegExp(`^\\s*// @snippet:end.*${eol}?`, 'ig');

  // remove @snippet:start and trailing newline
  return content.replace(startRegex, '').replace(endRegex, '');
};
