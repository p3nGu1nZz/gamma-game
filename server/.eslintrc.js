module.exports = {
  /* your base configuration of choice */
  extends: 'eslint:recommended',

  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    "no-console": "off"
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  }
}