var PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  plugins: [
    new PrettierPlugin({
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    encoding: 'utf-8',
    extensions: [ ".js", ".ts" ]
  })
  ],
};