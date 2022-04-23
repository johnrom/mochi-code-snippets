/**
 * Strip duplicate empty newlines, useful for "floating comments", like:
 *
 * ```
 * doThing();
 *
 * // @snippet:start hello
 *
 * doThing();
 * ```
 *
 * This results in:
 *
 * ```
 * doThing();
 *
 *
 * doThing();
 * ```
 *
 * This would deduplicate it to:
 *
 * ```
 * doThing();
 *
 * doThing();
 * ```
 *
 * @param extension The extension type of the code, like 'md' or 'js'.
 * @param eol The end-of-line operator of the file, like \n or \r\n.
 */
export const removeDuplicateEmptyNewlines = (
  codeBlock: string,
  eol: string
) => {
  const duplicateEmptyNewlineRegex = new RegExp(`(?:${eol}){3,}`, 'g');

  return codeBlock.replace(duplicateEmptyNewlineRegex, `${eol}${eol}`);
};
