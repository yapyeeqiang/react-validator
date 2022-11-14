import pkg from "./package.json";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/hooks/validation.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  external: ["react", "react-dom"],
  plugins: [uglify()],
};
