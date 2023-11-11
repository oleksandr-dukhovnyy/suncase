module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      // prettierConfig
      {
        printWidth: 80,
        semi: true,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'es5',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'always',
        vueIndentScriptAndStyle: true,
        singleAttributePerLine: true,
        htmlWhitespaceSensitivity: 'strict',
        endOfLine: 'auto',
      },
    ],
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off', // Prettier conflicts
    'vue/singleline-html-element-content-newline': 'off', // Prettier conflicts
    'vue/multiline-html-element-content-newline': 'off', // Prettier conflicts
  },
  ignorePatterns: [
    '.eslintrc.js',
    '*.scss',
    '*.sh',
    '*.svg',
    '*.ico',
    '*.json',
    '*.md',
    'node_modules',
  ],
};
