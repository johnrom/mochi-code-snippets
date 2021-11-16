import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { RollupOptions } from 'rollup';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

type Callback = (config: RollupOptions) => RollupOptions;

export const getBaseRollupConfig = (
  tsConfig: string | false,
  callback: Callback
): (RollupOptions | [])[] => {
  const baseBuildConfig: RollupOptions = {
    external: [/@babel\/runtime/],

    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs(),

      // Compile TypeScript/JavaScript files
      babel({ extensions, include: ['src/**/*'], babelHelpers: 'runtime' }),
    ],
  };

  const tsDefinitionsConfig: RollupOptions[] = tsConfig
    ? [
        {
          input: './src/index.ts',
          plugins: [
            // Allows node_modules resolution
            resolve({ extensions }),
            typescript({
              tsconfig: tsConfig,
            }),
          ],
          output: {
            file: './dist/index.js',
          },
        },
      ]
    : [];

  return tsDefinitionsConfig.concat([callback(baseBuildConfig)]);
};
