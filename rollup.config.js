import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import { peerDependencies } from "./package.json";

export default [
    {
        input: "src/deparam.js",
        external: Object.keys(peerDependencies),
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
        external: Object.keys(peerDependencies),
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