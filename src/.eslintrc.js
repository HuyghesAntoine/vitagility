module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "indent": ["error",4],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "no-unused-vars": "off",
    "no-undef": "off",
  },
  globals: {
    "_": "readonly",
  },
};
