export interface CodeSnippetRegexDefinition {
  start: string;
  end: string;
  emptyEnd: string;
}

export type CodeSnippetRegexDefinitions = {
  [key: string]: CodeSnippetRegexDefinition[];
  default: CodeSnippetRegexDefinition[];
};

export const snippetIdRegexString = '[A-Za-z0-9][A-Za-z0-9-_]*';

/**
 * These definitions are super basic, and it should probably use AST instead.
 * This won't support multiline snippets for now because there is no way to remove empty comments without AST.
 *
 * @param maybeSnippetId Pass a snippet ID here, if not it will match any snippet ID (useful for removing snippets)
 */
export const getCodeSnippetRegexDefinitions = (
  extension: string | null | undefined,
  maybeSnippetId?: string
) => {
  const snippetIdRegex = maybeSnippetId ?? snippetIdRegexString;
  const doubleSlashedComment = {
    start: `^\\s*//\\s*@snippet:start ${snippetIdRegex}(?:[^\S\r\n].*)?$`,
    end: `^\\s*//\\s*@snippet:end ${snippetIdRegex}(?:[^\S\r\n].*)?$`,
    emptyEnd: `^\\s*//\\s*@snippet:end\\s*$`,
  };
  const allDefinitions: CodeSnippetRegexDefinitions = {
    md: [
      {
        start: `^\\[comment\\]: # '@snippet:start ${snippetIdRegex}[^']*'[^\r\n]*$`,
        end: `^\\[comment\\]: # '@snippet:end ${snippetIdRegex}[^']*'[^\r\n]*$`,
        emptyEnd: `^\\[comment\\]: # '@snippet:end[^\S\r\n]*'[^\S\r\n]*$`,
      },
      {
        start: `^\\[comment\\]: # \\(@snippet:start ${snippetIdRegex}[^)\r\n]*\\)[^\r\n]*$`,
        end: `^\\[comment\\]: # \\(@snippet:end ${snippetIdRegex}[^)\r\n]*\\)[^\r\n]*$`,
        emptyEnd: `^\\[comment\\]: # \\(@snippet:end[^\S\r\n]*\\)[^\S\r\n]*$`,
      },
    ],
    js: [doubleSlashedComment],
    cs: [doubleSlashedComment],
    ts: [doubleSlashedComment],
    default: [doubleSlashedComment],
  };

  return extension && extension in allDefinitions
    ? allDefinitions[extension]
    : allDefinitions.default;
};
