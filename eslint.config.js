// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    plugins: { 'jsx-a11y': jsxA11y },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    ignores: ['.astro/', 'dist/', 'node_modules/', '.vercel/'],
  },
];
