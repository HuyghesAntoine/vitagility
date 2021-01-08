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
        indent: ['warn', 4],
        'linebreak-style': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
    },
    globals: {
        _: 'readonly',
    },
    parserOptions: {
        sourceType: 'module',
    },
};
