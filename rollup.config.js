import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

const banner = `/**!
 * Deparam plugin converts query string to a valid JavaScript object
 * Released under MIT license
 * @name Deparam.js
 * @author Sachin Singh <contactsachinsingh@gmail.com>
 * @version ${pkg.version}
 * @license MIT
 */`;

export default [
    {
        input: "src/deparam.js",
        output: {
            file: "dist/esm/deparam.esm.js",
            format: "esm",
            name: "deparam",
            sourcemap: true,
            banner
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/deparam.js",
        output: {
            file: "dist/umd/deparam.js",
            format: "umd",
            name: "deparam",
            sourcemap: true,
            banner
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/deparam.js",
        output: {
            file: "dist/esm/deparam.esm.min.js",
            format: "esm",
            name: "deparam",
            banner
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            terser({
                output: {
                    comments: function () {
                        const [, comment] = arguments;
                        if (comment.type === "comment2") {
                            return /@preserve|@license|@cc_on/i.test(comment.value);
                        }
                        return false;
                    }
                }
            })
        ]
    },
    {
        input: "src/deparam.js",
        output: {
            file: "dist/umd/deparam.min.js",
            format: "umd",
            name: "deparam",
            banner
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            terser({
                output: {
                    comments: function () {
                        const [, comment] = arguments;
                        if (comment.type === "comment2") {
                            return /@preserve|@license|@cc_on/i.test(comment.value);
                        }
                        return false;
                    }
                }
            })
        ]
    }
]
