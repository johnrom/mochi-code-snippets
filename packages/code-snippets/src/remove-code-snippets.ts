import { getCodeSnippetRegexDefinitions } from './code-snippet-definitions';

export const removeCodeSnippets = (
  extension: string | null | undefined,
  codeBlock: string,
  eol: string
) => {
  const regexDefinitions = getCodeSnippetRegexDefinitions(extension);

  for (let i = 0; i < regexDefinitions.length; i++) {
    const regexDefinition = regexDefinitions[i];

    const startRegex = new RegExp(`${regexDefinition.start}${eol}?`, 'ig');
    const endRegex = new RegExp(`${regexDefinition.end}${eol}?`, 'ig');
    const emptyEndRegex = new RegExp(
      `${regexDefinition.emptyEnd}${eol}?`,
      'ig'
    );

    codeBlock = codeBlock
      .replace(startRegex, '')
      .replace(endRegex, '')
      .replace(emptyEndRegex, '');
  }

  return codeBlock;
};
