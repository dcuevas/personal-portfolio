import { builtinModules } from 'module';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  // Global ignores
  {
    ignores: [
      'dist/*',
      '.cache',
      'public',
      'node_modules',
      '*.esm.js',
      'next-env.d.ts',
      '.next',
      '.contentlayer',
    ],
  },

  // Base config for all files
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLButtonElement: 'readonly',
        URL: 'readonly',
        // Node globals
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // Other globals
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@next/next': nextPlugin,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
      tailwindcss: tailwindcss,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...prettierConfig.rules,
      ...tailwindcss.configs.recommended.rules,

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'sort-imports': 'off',
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'simple-import-sort/imports': [
        2,
        {
          groups: [
            ['^.+\\.s?css$'],
            [`^(${builtinModules.join('|')})(/|$)`, '^react', '^@?\\w'],
            ['^components(/.*|$)'],
            ['^lib(/.*|$)', '^hooks(/.*|$)'],
            ['^\\.'],
          ],
        },
      ],
    },
    settings: {
      tailwindcss: {
        callees: ['cn'],
        config: 'tailwind.config.js',
      },
    },
  },
];
