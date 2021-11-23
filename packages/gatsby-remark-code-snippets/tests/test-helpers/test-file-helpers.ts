import fs from 'fs';
import path from 'path';

const testFileJsPath = path.resolve(
  __dirname,
  '../../../../fixtures/test-file-tsjs.js'
);
const testFileTsPath = path.resolve(
  __dirname,
  '../../../../fixtures/test-file-tsjs.ts'
);
const testFileMdPath = path.resolve(
  __dirname,
  '../../../../fixtures/test-file-md.md'
);

// normalize test files to \n
const testFileJs = fs
  .readFileSync(testFileJsPath, 'utf8')
  .replace(/\r\n/g, '\n');
const testFileTs = fs
  .readFileSync(testFileTsPath, 'utf8')
  .replace(/\r\n/g, '\n');
const testFileMd = fs
  .readFileSync(testFileMdPath, 'utf8')
  .replace(/\r\n/g, '\n');

// test \r\n
const maybeConvertToCR = (newlineOnlyFile: string, eol = '\n') => {
  return eol === '\n'
    ? newlineOnlyFile
    : newlineOnlyFile.replace(/\n/g, '\r\n');
};

export const getBasicTestFileJs = (eol?: string) =>
  maybeConvertToCR(testFileJs, eol);
export const getBasicTestFileTs = (eol?: string) =>
  maybeConvertToCR(testFileTs, eol);
export const getBasicTestFileMd = (eol?: string) =>
  maybeConvertToCR(testFileMd, eol);
