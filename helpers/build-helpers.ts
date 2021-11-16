import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export const getBaseRollupConfig = (tsConfig: string) => ({
  input: './src/index.ts',

  external: [/@babel\/runtime/],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
  ]
    .concat(
      // Compile TypeScript/JavaScript files only for ESM build
      tsConfig
        ? [
            typescript({
              tsconfig: tsConfig,
            }),
          ]
        : []
    )
    .concat([
      // Compile TypeScript/JavaScript files
      babel({ extensions, include: ['src/**/*'], babelHelpers: 'runtime' }),
    ]),
});
