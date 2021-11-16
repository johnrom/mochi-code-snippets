import pkg from './package.json';
import { getBaseRollupConfig } from '../../helpers/build-helpers';

export default [
  {
    ...getBaseRollupConfig(),
    output: {
      file: pkg.main,
      format: 'cjs',
    },
  },
  {
    ...getBaseRollupConfig('./tsconfig.rollup.json'),
    output: {
      file: pkg.module,
      format: 'es',
    },
  },
];
