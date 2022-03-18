import { getBaseRollupConfig } from '../../helpers/getBaseRollupConfig';
import pkg from './package.json';

export default getBaseRollupConfig(
  './tsconfig.rollup.json',
  (esmOptions) => ({
    ...esmOptions,
    input: './src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es',
      },
    ],
  }),
  (cjsOptions) => ({
    ...cjsOptions,
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
  })
);
