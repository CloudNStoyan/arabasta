const tseslint = require('typescript-eslint');
const requireUseeffectDependencyArray = require('@arabasta/eslint-plugin-require-useeffect-dependency-array');
const { FlatCompat } = require('@eslint/eslintrc');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const reactESLint = require('eslint-plugin-react');
const reactRefresh = require('eslint-plugin-react-refresh');

const compat = new FlatCompat();

// The tseslint.config function is a variadic identity function which is a fancy way of saying
// that it's a function with a spread argument that accepts any number flat config objects
// and returns the objects unchanged. It exists as a way to quickly and easily provide
// types for your flat config file without the need for JSDoc type comments.
module.exports = tseslint.config(
  requireUseeffectDependencyArray.configs.recommended,
  reactESLint.configs.flat.recommended,
  reactESLint.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  ...compat.extends('plugin:react-hooks/recommended'),
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
      propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
    },
    rules: {
      // TODO: Decide how to handle this?
      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [
            'render',
            'getInitialState',
            'getDefaultProps',
            'getChildContext',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentDidCatch',
            'getSnapshotBeforeUpdate',
          ],
        },
      ],
      'react/display-name': 'off',
      'react/forbid-prop-types': [
        'error',
        {
          forbid: ['any', 'array', 'object'],
          checkContextTypes: true,
          checkChildContextTypes: true,
        },
      ],
      'react/forbid-dom-props': 'off',
      'react/jsx-boolean-value': ['error', 'never', { always: [] }],
      'react/jsx-handler-names': 'off',
      'react/jsx-key': 'off',
      'react/jsx-no-bind': [
        'error',
        {
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
          ignoreDOMComponents: true,
        },
      ],
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
      'react/jsx-no-literals': 'off',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      'react/sort-prop-types': 'off',
      'react/jsx-sort-prop-types': 'off',
      'react/jsx-sort-props': 'off',
      'react/jsx-sort-default-props': 'off',
      'react/jsx-uses-vars': 'error',
      'react/no-danger': 'warn',
      'react/no-deprecated': ['error'],
      'react/no-did-mount-set-state': 'off',
      'react/no-did-update-set-state': 'error',
      'react/no-will-update-set-state': 'error',
      'react/no-direct-mutation-state': 'off',
      'react/no-is-mounted': 'error',
      'react/no-multi-comp': 'off',
      'react/no-set-state': 'off',
      'react/no-string-refs': 'error',
      'react/no-unknown-property': 'error',
      'react/prefer-es6-class': ['error', 'always'],
      'react/prefer-stateless-function': [
        'error',
        { ignorePureComponents: true },
      ],
      'react/prop-types': [
        'error',
        {
          ignore: [],
          customValidators: [],
          skipUndeclared: false,
        },
      ],
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            '/^handle.+$/',
            '/^on.+$/',
            'getters',
            'setters',
            '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
            'instance-methods',
            'everything-else',
            'rendering',
          ],
          groups: {
            lifecycle: [
              'displayName',
              'propTypes',
              'contextTypes',
              'childContextTypes',
              'mixins',
              'statics',
              'defaultProps',
              'constructor',
              'getDefaultProps',
              'getInitialState',
              'state',
              'getChildContext',
              'getDerivedStateFromProps',
              'componentWillMount',
              'UNSAFE_componentWillMount',
              'componentDidMount',
              'componentWillReceiveProps',
              'UNSAFE_componentWillReceiveProps',
              'shouldComponentUpdate',
              'componentWillUpdate',
              'UNSAFE_componentWillUpdate',
              'getSnapshotBeforeUpdate',
              'componentDidUpdate',
              'componentDidCatch',
              'componentWillUnmount',
            ],
            rendering: ['/^render.+$/', 'render'],
          },
        },
      ],
      'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
      'react/jsx-no-comment-textnodes': 'error',
      'react/no-render-return-value': 'error',
      'react/require-optimization': 'off',
      'react/no-find-dom-node': 'error',
      'react/forbid-component-props': 'off',
      'react/forbid-elements': 'off',
      'react/no-danger-with-children': 'error',
      'react/no-unused-prop-types': [
        'error',
        {
          customValidators: [],
          skipShapeProps: true,
        },
      ],
      'react/style-prop-object': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-children-prop': 'error',
      'react/jsx-space-before-closing': 'off',
      'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
      'react/void-dom-elements-no-children': 'error',
      'react/default-props-match-prop-types': [
        'error',
        { allowRequiredDefaults: false },
      ],
      'react/no-redundant-should-component-update': 'error',
      'react/no-unused-state': 'error',
      'react/boolean-prop-naming': 'off',
      'react/no-typos': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/destructuring-assignment': ['error', 'always'],
      'react/no-access-state-in-setstate': 'error',
      'react/button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: false,
        },
      ],
      'react/jsx-child-element-spacing': 'off',
      'react/no-this-in-sfc': 'error',
      'react/jsx-max-depth': 'off',
      'react/no-unsafe': 'off',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/state-in-constructor': ['error', 'always'],
      'react/static-property-placement': ['error', 'property assignment'],
      'react/prefer-read-only-props': 'off',
      'react/jsx-no-script-url': [
        'error',
        [
          {
            name: 'Link',
            props: ['to'],
          },
        ],
      ],
      'react/jsx-no-useless-fragment': 'error',
      'react/no-adjacent-inline-elements': 'off',
      'react/jsx-newline': 'off',
      'react/jsx-no-constructed-context-values': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-namespace': 'error',
      'react/prefer-exact-props': 'error',
      'react/no-arrow-function-lifecycle': 'error',
      'react/no-invalid-html-attribute': 'error',
      'react/no-unused-class-component-methods': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react-refresh/only-export-components': 'warn',
      'react/function-component-definition': 'off',
      'react/no-array-index-key': 'off',
      'jsx-a11y/accessible-emoji': 'off',
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img', 'object', 'area', 'input[type="image"]'],
          img: [],
          object: [],
          area: [],
          'input[type="image"]': [],
        },
      ],
      'jsx-a11y/anchor-has-content': ['error', { components: [] }],
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/autocomplete-valid': 'off',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/control-has-associated-label': [
        'error',
        {
          labelAttributes: ['label'],
          controlComponents: [],
          ignoreElements: [
            'audio',
            'canvas',
            'embed',
            'input',
            'textarea',
            'tr',
            'video',
          ],
          ignoreRoles: [
            'grid',
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'row',
            'tablist',
            'toolbar',
            'tree',
            'treegrid',
          ],
          depth: 5,
        },
      ],
      'jsx-a11y/heading-has-content': ['error', { components: [''] }],
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: [],
          labelAttributes: [],
          controlComponents: [],
          assert: 'both',
          depth: 25,
        },
      ],
      'jsx-a11y/lang': 'error',
      'jsx-a11y/media-has-caption': [
        'error',
        {
          audio: [],
          video: [],
          track: [],
        },
      ],
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
      'jsx-a11y/no-distracting-elements': [
        'error',
        {
          elements: ['marquee', 'blink'],
        },
      ],
      'jsx-a11y/no-interactive-element-to-noninteractive-role': [
        'error',
        {
          tr: ['none', 'presentation'],
        },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
          handlers: [
            'onClick',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
        },
      ],
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
          ul: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
          ol: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
          li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
          table: ['grid'],
          td: ['gridcell'],
        },
      ],
      'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        {
          tags: [],
          roles: ['tabpanel'],
        },
      ],
      'jsx-a11y/no-onchange': 'off',
      'jsx-a11y/no-redundant-roles': ['error'],
      'jsx-a11y/no-static-element-interactions': [
        'error',
        {
          handlers: [
            'onClick',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
        },
      ],
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/anchor-ambiguous-text': ['error'],
    },
  }
);
