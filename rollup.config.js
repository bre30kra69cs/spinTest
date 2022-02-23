import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    typescript({
      noEmitHelpers: false,
    }),
    replace({
      values: {
        'process.env.PRODUCTION': process.env.NODE_ENV === 'production',
      },
    }),
  ],
};
