import resolve from "rollup-plugin-node-resolve";

export default {
  entry: "src/index.js",
  format: "umd",
  moduleName: "doitlater",
  plugins: [resolve()],
  dest: "bin/doitlater.es6.js"
};