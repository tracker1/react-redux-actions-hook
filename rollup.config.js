// rollup.config.js
export default {
  input: "src/index.js",
  output: {
    file: "lib/index.js",
    format: "cjs"
  },
  external: ["react", "redux", "react-redux"] // <-- suppresses the warning
};
