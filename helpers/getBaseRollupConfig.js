import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
export const getBaseRollupConfig = (tsConfig, callback) => {
    const baseBuildConfig = {
        external: (source) => !source.startsWith('.') && !path.isAbsolute(source),
        plugins: [
            // Allows node_modules resolution
            resolve({ extensions }),
            // Allow bundling cjs modules. Rollup doesn't understand cjs
            commonjs(),
            // Compile TypeScript/JavaScript files
            babel({ extensions, include: ['src/**/*'], babelHelpers: 'runtime' }),
        ],
    };
    const tsDefinitionsConfig = tsConfig
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
