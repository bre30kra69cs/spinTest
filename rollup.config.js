import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: isProduction ? false : 'inline',
  },
  plugins: [
    typescript({
      noEmitHelpers: false,
    }),
    replace({
      values: {
        'process.env.PRODUCTION': isProduction,
      },
    }),
    isProduction && terser(),
  ],
};
