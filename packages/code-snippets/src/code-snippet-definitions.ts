export interface CodeSnippetRegexDefinition {
  start: string;
  end: string;
  emptyEnd: string;
}

export type CodeSnippetRegexDefinitions = {
  [key: string]: CodeSnippetRegexDefinition[];
};

export const snippetIdRegexString = '[A-Za-z0-9][A-Za-z0-9-_]*';

/**
 * These definitions are super basic, and it should probably use AST instead.
 * This won't support multiline snippets for now because there is no way to remove empty comments without AST.
 *
 * @param maybeSnippetId Pass a snippet ID here, if not it will match any snippet ID (useful for removing snippets)
 */
export const getCodeSnippetRegexDefinitions = (
  extension: string,
  maybeSnippetId?: string
) => {
  if (!extension) {
    throw new Error(
      '@nmbl/code-snippets: regex definitions requested without an extension. Please choose an extension to parse code snippets.'
    );
  }
  const snippetIdRegex = maybeSnippetId ?? snippetIdRegexString;
  const doubleSlashedComment = {
    start: `^[^\S\r\n]*//\\s*@snippet:start ${snippetIdRegex}(?:[^\S\r\n].*)?$`,
    end: `^[^\S\r\n]*//\\s*@snippet:end ${snippetIdRegex}(?:[^\S\r\n].*)?$`,
    emptyEnd: `^[^\S\r\n]*//\\s*@snippet:end\\s*$`,
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
  };

  if (!extension || !(extension in allDefinitions)) {
    throw new Error(
      `@nmbl/code-snippets: The extension "${extension}" doesn't exist in our definitions. Feel free to open a PR to support your language of choice! A link to our repository is available in package.json.`
    );
  }

  return extension && extension in allDefinitions
    ? allDefinitions[extension]
    : allDefinitions.default;
};
