import { getBaseRollupConfig } from '../../helpers/getBaseRollupConfig';
import pkg from './package.json';

export default getBaseRollupConfig('./tsconfig.rollup.json', (options) => ({
  ...options,
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
}));
