import { getCodeSnippetRegexDefinitions } from './code-snippet-definitions';

export const removeCodeSnippets = (
  extension: string,
  codeBlock: string,
  eol: string
) => {
  const regexDefinitions = getCodeSnippetRegexDefinitions(extension);

  if (regexDefinitions) {
    for (let i = 0; i < regexDefinitions.length; i++) {
      const regexDefinition = regexDefinitions[i];

      const startRegex = new RegExp(`${regexDefinition.start}${eol}?`, 'igm');
      const endRegex = new RegExp(`${regexDefinition.end}${eol}?`, 'igm');
      const emptyEndRegex = new RegExp(
        `${regexDefinition.emptyEnd}${eol}?`,
        'igm'
      );

      codeBlock = codeBlock
        .replace(startRegex, '')
        .replace(endRegex, '')
        .replace(emptyEndRegex, '');
    }
  }

  return codeBlock;
};
