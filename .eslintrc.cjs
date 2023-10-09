module.exports = {
  globals: {
    React: true,
  },
  root: true,
  settings: { react: { version: 'detect' } },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'package.json',
    'tsconfig.json',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'standard',
    'standard-jsx',
    'standard-react',
    'plugin:mdx/recommended',
  ],
  overrides: [
    {
      env: { node: true },
      files: [
        '.eslintrc.cjs',
      ],
      parserOptions: { sourceType: 'script' },
    },
    {
      files: ['*.mdx'],
      extends: 'plugin:mdx/recommended',
      parserOptions: {
        parser: 'eslint-mdx',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-refresh',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'tailwindcss/no-custom-classname': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react-refresh/only-export-components': 'warn',
  },
}
