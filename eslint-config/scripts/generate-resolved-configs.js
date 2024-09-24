const { exec } = require('node:child_process');
const fs = require('node:fs/promises');
const path = require('node:path');

function sortObjectKeysRecursively(inputObject) {
  if (Array.isArray(inputObject)) {
    const newArray = [];

    for (let i = 0, l = inputObject.length; i < l; i++) {
      newArray[i] = sortObjectKeysRecursively(inputObject[i]);
    }

    return newArray;
  }

  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject;
  }

  const newObject = {};

  const sortedKeys = Object.keys(inputObject).sort();

  for (let i = 0, l = sortedKeys.length; i < l; i++) {
    newObject[sortedKeys[i]] = sortObjectKeysRecursively(
      inputObject[sortedKeys[i]]
    );
  }

  return newObject;
}

function postProcessConfig(configContent) {
  let config = JSON.parse(configContent);

  // Sort the plugins array.
  config.plugins = config.plugins.toSorted((a, b) => a.localeCompare(b));

  // Normalize the severity values.
  const NUMBER_TO_SEVERITY_MAP = { 0: 'off', 1: 'warn', 2: 'error' };

  for (const ruleName of Object.keys(config.rules)) {
    const ruleOptions = config.rules[ruleName];

    if (Array.isArray(ruleOptions)) {
      ruleOptions[0] = NUMBER_TO_SEVERITY_MAP[ruleOptions[0]];
    } else {
      // This isn't supposed to happen
      throw new Error(
        `Rule Options must always be an array, but this is not the case for: ${ruleName}`
      );
    }
  }

  // Sort all the object keys.
  config = sortObjectKeysRecursively(config);

  return JSON.stringify(config, null, 2);
}

async function getResolvedConfig(configFilePath, filePath) {
  return new Promise((resolve, reject) => {
    exec(
      `npx eslint -c ${configFilePath} --print-config ${filePath}`,
      (error, stdOut, stdErr) => {
        if (error) {
          reject(error);
          return;
        }

        if (stdErr) {
          reject(stdErr);
          return;
        }

        resolve(stdOut);
      }
    );
  });
}

const ESLINT_RESOLVED_CONFIGS_FOLDER = 'resolved-configs';

const filePaths = [
  'config-file.js',
  'src/file.js',
  'src/file.test.js',
  'config-file.ts',
  'src/file.ts',
  'src/file.test.ts',
  'declaration-file.d.ts',
];

(async () => {
  const resolvedConfigs = await Promise.all([
    ...filePaths.map((filePath) =>
      getResolvedConfig('test-eslint-config.js', filePath)
    ),
  ]);

  for (let i = 0; i < resolvedConfigs.length; i += 1) {
    const filePath = filePaths[i];
    const resolvedProcessedConfig = postProcessConfig(resolvedConfigs[i]);

    const fullFilePath = path.join(
      ESLINT_RESOLVED_CONFIGS_FOLDER,
      `${filePath}.json`
    );

    await fs.mkdir(path.dirname(fullFilePath), { recursive: true });
    await fs.writeFile(fullFilePath, resolvedProcessedConfig);
  }
})();
