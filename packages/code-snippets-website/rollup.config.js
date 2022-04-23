import { getBaseBuildConfig } from '../../helpers/getBaseRollupConfig';
import { cjsExternal } from '../../helpers/getBaseRollupConfig';
import typescript from 'rollup-plugin-typescript2';

const configFilePath = './gatsby-config.src.ts';

const baseConfig = getBaseBuildConfig([configFilePath]);

export default {
  ...baseConfig,
  input: configFilePath,
  external: cjsExternal,
  plugins: [
    ...baseConfig.plugins,
    typescript({
        tsconfig: './tsconfig.rollup.json',
    })
  ],
  output: [
    {
      file: './gatsby-config.js',
      format: 'cjs',
    },
  ],
};
