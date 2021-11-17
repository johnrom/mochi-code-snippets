export interface CodeSnippetRegexDefinition {
  start: string;
  end: string;
  emptyEnd: string;
}

export type CodeSnippetRegexDefinitions = {
  [key: string]: CodeSnippetRegexDefinition[];
  default: CodeSnippetRegexDefinition[];
};

export const snippetIdRegexString = '[A-Za-z0-9-_]+';

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
    start: `^\\s*// '@snippet:start ${snippetIdRegex}\\s*'\\s*$`,
    anyStart: `^\\s*// '@snippet:start ${snippetIdRegex}\\s*'\\s*$`,
    end: `^\\s*// '@snippet:end ${snippetIdRegex}\\s*'\\s*$`,
    emptyEnd: `^\\s*// '@snippet:end\\s*'\\s*$`,
  };
  const allDefinitions: CodeSnippetRegexDefinitions = {
    md: [
      {
        start: `^[comment]: # '@snippet:start ${snippetIdRegex}\\s*'\\s*$`,
        end: `^[comment]: # '@snippet:end ${snippetIdRegex}\\s*'\\s*$`,
        emptyEnd: `[comment]: # '@snippet:end\\s*'\\s*$`,
      },
      {
        start: `^[comment]: # \(@snippet:start ${snippetIdRegex}\\s*\)\\s*$`,
        end: `^[comment]: # \(@snippet:end ${snippetIdRegex}\\s*\)\\s*$`,
        emptyEnd: `[comment]: # \(@snippet:end\\s*\)\\s*$`,
      },
    ],
    js: [doubleSlashedComment],
    ts: [doubleSlashedComment],
    default: [doubleSlashedComment],
  };

  return extension && extension in allDefinitions
    ? allDefinitions[extension]
    : allDefinitions.default;
};
