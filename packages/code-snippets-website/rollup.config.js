import { getBaseBuildConfig } from '../../helpers/getBaseRollupConfig';
import { cjsExternal } from '../../helpers/getBaseRollupConfig';

export default {
  ...getBaseBuildConfig(['./gatsby-config.js']),
  input: './gatsby-config.src.js',
  external: cjsExternal,
  output: [
    {
      file: './gatsby-config.js',
      format: 'cjs',
    },
  ],
};
