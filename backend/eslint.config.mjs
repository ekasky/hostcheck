import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    prettier, // Disables ESLint rules that conflict with Prettier
    {
        plugins: { prettier: prettierPlugin },
        rules: {
            'prettier/prettier': 'error', // Ensures Prettier formatting is enforced
            '@typescript-eslint/no-unused-vars': ['warn'],
            'no-console': 'warn',
        },
    },
];
