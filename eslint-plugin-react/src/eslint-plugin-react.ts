import requireUseeffectDependencyArrayRule from './rules/require-useeffect-dependency-array';

const plugin = {
  meta: {
    name: '@arabasta/eslint-plugin-react',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'require-useeffect-dependency-array': requireUseeffectDependencyArrayRule,
  },
  processors: {},
};

const recommendedRules = {
  '@arabasta/react/require-useeffect-dependency-array': 'error',
};

plugin.configs = {
  recommended: {
    name: '@arabasta/eslint-plugin-react/recommended',
    plugins: {
      '@arabasta/react': plugin,
    },
    rules: recommendedRules,
  },
  'recommended-legacy': {
    plugins: ['@arabasta/react'],
    rules: recommendedRules,
  },
};

export = plugin;
