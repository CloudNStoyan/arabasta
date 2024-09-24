const arabastaConfig = require('./src/index');
const reactConfig = require('./src/react');
const configFilesConfig = require('./src/config-files');
const typescriptConfig = require('./src/typescript');
const typescriptDefinitionsConfig = require('./src/typescript-definitions');
const reactTypescriptConfig = require('./src/react-typescript');
const testsConfig = require('./src/tests');

module.exports = [
  ...arabastaConfig,
  ...reactConfig,

  ...typescriptConfig,
  ...typescriptDefinitionsConfig,
  ...reactTypescriptConfig,

  ...configFilesConfig,
  ...testsConfig,

  {
    ignores: ['package-lock.json', 'dist', 'coverage', 'extra'],
  },
];
