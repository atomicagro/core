module.exports = {
  env: { jest: true, node: true },
  extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-import-helpers',
    'sort-destructure-keys',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import-helpers/order-imports': [
      'error',
      {
        alphabetize: { ignoreCase: true, order: 'asc' },
        groups: [
          'module',
          '/^@api/',
          '/^@configs/',
          '/^@error/',
          '/^@services/',
          '/^@utils/',
          '/^test/',
          ['parent', 'sibling', 'index'],
        ],
        newlinesBetween: 'always',
      },
    ],
    'max-len': ['error', { code: 120, ignorePattern: '^import\\W.*', ignoreTrailingComments: true, ignoreUrls: true }],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'log', 'info', 'disableYellowBox'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*'],
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: true }],
    'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
};
