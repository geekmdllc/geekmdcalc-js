import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    dir: 'build',
    format: 'cjs',
  },
  plugins: [babel({ babelHelpers: 'runtime' })],
}
