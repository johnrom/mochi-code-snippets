import fs from 'fs';
import path from 'path';

const basicTestFileJsPath = path.resolve('../fixtures/basic-test-file.js');
const basicTestFileTsPath = path.resolve('../fixtures/basic-test-file.ts');

const basicTestFileJs = fs.readFileSync(basicTestFileJsPath, 'utf8');
const basicTestFileTs = fs.readFileSync(basicTestFileTsPath, 'utf8');

export const getBasicTestFileJs = () => basicTestFileJs;
export const getBasicTestFileTs = () => basicTestFileTs;
