import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import autoprefixer from 'autoprefixer'

// const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      // {
      //   // file: packageJson.main,
      //   file: 'dist/cjs/index.js',
      //   format: 'cjs',
      //   sourcemap: true,
      //   name: '0xtoolkit',
      // },
      {
        // file: packageJson.module,
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['react', 'wagmi', 'ethers'],
    plugins: [
      external(),
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        plugins: [autoprefixer()],
        minimize: true,
        sourceMap: true,
        extract: 'styles.css',
      }),
      terser({ compress: true }),
    ],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
  },
]
