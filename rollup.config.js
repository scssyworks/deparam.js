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
            file: "dist/js/deparam.js",
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
            file: "dist/js/deparam.min.js",
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