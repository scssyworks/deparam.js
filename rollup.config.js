import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const banner = `/*!
 * Deparam plugin converts query string to a valid JavaScript object
 * Released under MIT license
 * @name Deparam.js
 * @author Sachin Singh <https://github.com/scssyworks/deparam.js>
 * @version ${pkg.version}
 * @license MIT
 */`;

const output = {
  name: "deparam",
  banner,
  globals: {
    "is-number": "isNumber",
  },
  exports: "named",
};

const plugins = [
  cjs(),
  resolve(),
  babel({
    exclude: "node_modules/**",
    babelHelpers: "bundled",
  }),
];

const terserPlugin = terser({
  output: {
    comments: function () {
      const [, comment] = arguments;
      if (comment.type === "comment2") {
        return /@preserve|@license|@cc_on/i.test(comment.value);
      }
      return false;
    },
  },
});

export default [
  {
    input: "src/deparam.js",
    output: {
      ...output,
      file: "dist/esm/deparam.esm.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [...plugins],
  },
  {
    input: "src/deparam.js",
    output: {
      ...output,
      file: "dist/umd/deparam.js",
      format: "umd",
      sourcemap: true,
    },
    plugins: [...plugins],
  },
  {
    input: "src/deparam.js",
    output: {
      ...output,
      file: "dist/esm/deparam.esm.min.js",
      format: "esm",
    },
    plugins: [...plugins, terserPlugin],
  },
  {
    input: "src/deparam.js",
    output: {
      ...output,
      file: "dist/umd/deparam.min.js",
      format: "umd",
    },
    plugins: [...plugins, terserPlugin],
  },
];
