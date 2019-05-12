import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: "src/deparam.js",
        output: {
            file: "dist/js/deparam.js",
            format: "umd",
            name: "deparam",
            sourcemap: true,
            globals: {
                jquery: "jQuery"
            }
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
            globals: {
                jquery: "jQuery"
            }
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            uglify()
        ]
    }
]