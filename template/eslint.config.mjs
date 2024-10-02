import { fixupConfigRules, fixupPluginRules } from "@eslint/compat"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import react from "eslint-plugin-react"
import reactNative from "eslint-plugin-react-native"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unusedImports from "eslint-plugin-unused-imports"
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      "eslint.config.mjs",
      "**/node_modules/",
      "**/build/",
      "**/*.json",
      "**/*config.js",
      "detox/**/*",
      "**/reactotron/**/*",
      "bin/**/*",
      "**/__tests__/*",
      "test/mocks/*",
      "**/*.test.ts",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:typescript-sort-keys/recommended",
      "plugin:react/recommended",
      "plugin:react-native/all",
      "standard",
      "prettier",
    ),
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      "react-native": fixupPluginRules(reactNative),
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "sort-destructure-keys": sortDestructureKeys,
    },

    languageOptions: {
      globals: {
        ...reactNative.environments["react-native"]["react-native"],
        __DEV__: false,
        jasmine: false,
        beforeAll: false,
        afterAll: false,
        beforeEach: false,
        afterEach: false,
        test: false,
        expect: false,
        describe: false,
        jest: false,
        it: false,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: "./tsconfig.json",
      },
    },

    settings: {
      react: {
        pragma: "React",
        version: "detect",
      },
    },

    rules: {
      "@typescript-eslint/no-require-imports": 0,
      "@typescript-eslint/ban-ts-ignore": 0,
      "@typescript-eslint/ban-ts-comment": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/explicit-member-accessibility": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/indent": 0,
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/member-delimiter-style": 0,
      "@typescript-eslint/no-empty-interface": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-object-literal-type-assertion": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-empty-interface": 0,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "comma-dangle": 0,
      "multiline-ternary": 0,
      "no-undef": 0,
      "no-unused-vars": 0,
      "no-use-before-define": 0,
      "no-global-assign": 0,
      quotes: 0,
      "react-native/no-raw-text": 0,
      "react/no-unescaped-entities": 0,
      "react/prop-types": 0,
      "space-before-function-paren": 0,
      "unused-imports/no-unused-imports": "warn",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-console": "warn",
      "@typescript-eslint/no-unused-expressions": 0,
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^(@|components|app)(/.*|$)"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],

      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: ["key"],
          locale: "auto",
        },
      ],

      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          ignoreEnums: true,
          ignoreTypeIndexes: true,
          ignoreNumericLiteralTypes: true,
          ignoreArrayIndexes: true,
          ignore: [-1, 0, 1],
        },
      ],

      "sort-destructure-keys/sort-destructure-keys": [
        2,
        {
          caseSensitive: false,
        },
      ],
    },
  },
]
