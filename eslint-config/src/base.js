const reduxUseAppFunctions = require('@arabasta/eslint-plugin-redux-use-app-functions');
const reportCaughtError = require('@arabasta/eslint-plugin-report-caught-error');
const { FlatCompat } = require('@eslint/eslintrc');
const eslint = require('@eslint/js');
const eslintComments = require('@eslint-community/eslint-plugin-eslint-comments/configs');
const confusingBrowserGlobals = require('confusing-browser-globals');
const prettier = require('eslint-config-prettier');
const es = require('eslint-plugin-es');
const newWithError = require('eslint-plugin-new-with-error');
const unusedImports = require('eslint-plugin-unused-imports');
const globals = require('globals');
const tseslint = require('typescript-eslint');

const compat = new FlatCompat();

// TODO: Create multiple test files and automatic config resolution for all of their combinations - react, typescript, (jest or vitest)
// TODO: Test how internal imports are resolved in .js files.
// TODO: Add vitest setup
// TODO: Test in both workshops with `npm link`.
// TODO: Add a way to track new and disabled rules.

module.exports = tseslint.config(
  eslint.configs.recommended,
  reportCaughtError.configs.recommended,
  reduxUseAppFunctions.configs.recommended,
  eslintComments.recommended,
  ...compat.extends('plugin:import/recommended'),
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.es2015,
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        generators: true,
        ecmaFeatures: {
          globalReturn: true,
          generators: false,
          objectLiteralDuplicateProperties: false,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      'unused-imports': unusedImports,
      'new-with-error': newWithError,
      es,
    },

    // This section was copied from the airbnb config
    rules: {
      'accessor-pairs': 'off',
      'array-callback-return': ['error', { allowImplicit: true }],
      'block-scoped-var': 'error',
      complexity: 'off',
      'consistent-return': 'error',
      'default-case': ['error', { commentPattern: '^no default$' }],
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': ['error', { allowKeywords: true }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'grouped-accessor-pairs': 'error',
      'guard-for-in': 'error',
      'no-alert': 'warn',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-constructor-return': 'error',
      'no-div-regex': 'off',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],
      'no-empty-pattern': 'error',
      'no-empty-static-block': 'error',
      'no-eq-null': 'off',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-fallthrough': 'error',
      'no-global-assign': ['error', { exceptions: [] }],
      'no-native-reassign': 'off',
      'no-implicit-coercion': 'off',
      'no-implicit-globals': 'off',
      'no-implied-eval': 'error',
      'no-invalid-this': 'off',
      'no-iterator': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': 'off',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'off',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-restricted-properties': [
        'error',
        {
          object: 'arguments',
          property: 'callee',
          message: 'arguments.callee is deprecated',
        },
        {
          object: 'global',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'self',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'window',
          property: 'isFinite',
          message: 'Please use Number.isFinite instead',
        },
        {
          object: 'global',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          object: 'self',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          object: 'window',
          property: 'isNaN',
          message: 'Please use Number.isNaN instead',
        },
        {
          property: '__defineGetter__',
          message: 'Please use Object.defineProperty instead.',
        },
        {
          property: '__defineSetter__',
          message: 'Please use Object.defineProperty instead.',
        },
      ],
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-self-assign': [
        'error',
        {
          props: true,
        },
      ],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'off',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false,
        },
      ],
      'no-unused-labels': 'error',
      'no-useless-call': 'off',
      'no-useless-catch': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-warning-comments': 'off',
      'no-with': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
      'prefer-named-capture-group': 'off',
      'prefer-regex-literals': [
        'error',
        {
          disallowRedundantWrapping: true,
        },
      ],
      radix: 'error',
      'require-await': 'off',
      'require-unicode-regexp': 'off',
      'vars-on-top': 'error',
      yoda: 'error',
      'for-direction': 'error',
      'getter-return': ['error', { allowImplicit: true }],
      'no-async-promise-executor': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'warn',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-parens': 'off',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-obj-calls': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-promise-executor-return': 'error',
      'no-prototype-builtins': 'error',
      'no-regex-spaces': 'error',
      'no-setter-return': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable': 'error',
      'no-unreachable-loop': [
        'error',
        {
          ignore: [],
        },
      ],
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': [
        'error',
        { disallowArithmeticOperators: true },
      ],
      'no-unused-private-class-members': 'off',
      'no-useless-backreference': 'error',
      'no-negated-in-lhs': 'off',
      'require-atomic-updates': 'off',
      'use-isnan': 'error',
      'valid-jsdoc': 'off',
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'callback-return': 'off',
      'global-require': 'error',
      'handle-callback-err': 'off',
      'no-buffer-constructor': 'error',
      'no-mixed-requires': 'off',
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-env': 'off',
      'no-process-exit': 'off',
      'no-restricted-modules': 'off',
      'no-sync': 'off',
      'array-bracket-newline': 'off',
      'array-element-newline': 'off',
      camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
      'capitalized-comments': 'off',
      'consistent-this': 'off',
      'func-name-matching': 'off',
      'func-names': 'warn',
      'func-style': 'off',
      'id-denylist': 'off',
      'id-length': 'off',
      'id-match': 'off',
      'line-comment-position': 'off',
      'lines-between-class-members': 'off',
      'lines-around-comment': 'off',
      'lines-around-directive': [
        'error',
        {
          before: 'always',
          after: 'always',
        },
      ],
      'max-depth': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'max-statements-per-line': 'off',
      'multiline-comment-style': 'off',
      'multiline-ternary': 'off',
      'new-cap': [
        'error',
        {
          newIsCap: true,
          newIsCapExceptions: [],
          capIsNew: false,
          capIsNewExceptions: [
            'Immutable.Map',
            'Immutable.Set',
            'Immutable.List',
          ],
        },
      ],
      'newline-after-var': 'off',
      'newline-before-return': 'off',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-continue': 'error',
      'no-inline-comments': 'off',
      'no-lonely-if': 'error',
      'no-multi-assign': ['error'],
      'no-negated-condition': 'off',
      'no-nested-ternary': 'error',
      'no-new-object': 'error',
      'no-plusplus': 'error',
      'no-spaced-func': 'off',
      'no-ternary': 'off',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      'padding-line-between-statements': 'off',
      'prefer-exponentiation-operator': 'error',
      'prefer-object-spread': 'error',
      'require-jsdoc': 'off',
      'sort-keys': 'off',
      'sort-vars': 'off',
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            exceptions: ['-', '+'],
            markers: ['=', '!', '/'], // space here to support sprockets directives, slash for TS /// comments
          },
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!', ':', '::'], // space here to support sprockets directives and flow comment types
            balanced: true,
          },
        },
      ],
      'unicode-bom': ['error', 'never'],
      'wrap-regex': 'off',
      'init-declarations': 'off',
      'no-catch-shadow': 'off',
      'no-delete-var': 'error',
      'no-label-var': 'error',
      'no-restricted-globals': [
        'error',
        {
          name: 'isFinite',
          message:
            'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
        },
        {
          name: 'isNaN',
          message:
            'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
        },
      ].concat(
        confusingBrowserGlobals.map((g) => ({
          name: g,
          message: `Use window.${g} instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md`,
        }))
      ),
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      'no-use-before-define': [
        'error',
        { functions: true, classes: true, variables: true },
      ],
      'arrow-body-style': [
        'error',
        'as-needed',
        {
          requireReturnForObjectLiteral: false,
        },
      ],
      'constructor-super': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-duplicate-imports': 'off',
      'no-new-symbol': 'error',
      'no-restricted-exports': [
        'error',
        {
          restrictedNamedExports: [
            'default', // use `export default` to provide a default export
            'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
          ],
        },
      ],
      'no-this-before-super': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],
      'no-var': ['error'],
      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: false,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'prefer-numeric-literals': 'error',
      'prefer-reflect': 'off',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-yield': 'error',
      'symbol-description': 'error',
      'import/named': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
          optionalDependencies: false,
        },
      ],
      'import/no-mutable-exports': 'error',
      'import/no-amd': 'error',
      'import/first': 'error',
      'import/imports-first': 'off',
      'import/no-namespace': 'off',
      'import/newline-after-import': 'error',
      'import/max-dependencies': 'off',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-internal-modules': 'off',
      'import/unambiguous': 'off',
      'import/no-webpack-loader-syntax': 'error',
      'import/no-unassigned-import': 'off',
      'import/no-named-default': 'error',
      'import/no-anonymous-default-export': 'off',
      'import/exports-last': 'off',
      'import/group-exports': 'off',
      'import/no-named-export': 'off',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', { maxDepth: '∞' }],
      'import/no-useless-path-segments': ['error', { commonjs: true }],
      'import/dynamic-import-chunkname': 'off',
      'import/no-relative-parent-imports': 'off',
      'import/no-unused-modules': 'off',
      'import/no-import-module-exports': [
        'error',
        {
          exceptions: [],
        },
      ],
      'import/no-relative-packages': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            ['external'],
            'internal',
            ['sibling', 'parent', 'index'],
            'unknown',
            'object',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '**/*.+(css|scss)',
              patternOptions: { dot: true, nocomment: true },
              group: 'unknown',
              position: 'after',
            },
            {
              pattern: '{.,..}/**/*.+(css|scss)',
              patternOptions: { dot: true, nocomment: true },
              group: 'unknown',
              position: 'after',
            },
          ],
          warnOnUnassignedImports: true,
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
        },
      ],
      strict: ['error', 'never'],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true,
        },
      ],
    },
  },
  {
    // This section is custom configuration copied from the workshop repo.
    rules: {
      'no-void': 'off',
      'no-undefined': 'off',
      'linebreak-style': ['error', 'unix'],
      'no-console': 'error',
      'no-func-assign': 'error',
      'no-await-in-loop': 'off',
      'max-classes-per-file': 'off',
      'no-return-await': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
      'new-with-error/new-with-error': 'error',
      'unused-imports/no-unused-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Usage of relative parent imports is not allowed.',
            },
          ],
        },
      ],
      'import/prefer-default-export': 'off',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/extensions': ['error'],
      'import/no-default-export': 'error',
      'import/no-deprecated': 'error',
      'import/no-commonjs': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-nodejs-modules': 'error',
      'import/no-unresolved': [
        'error',
        { commonjs: true, caseSensitive: true },
      ],
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      '@arabasta/report-caught-error/report-caught-error': ['error'],
      'es/no-optional-catch-binding': 'error',
      curly: ['error', 'all'],
    },
  }
);
