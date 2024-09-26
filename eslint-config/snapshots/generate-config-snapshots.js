const { exec } = require('node:child_process');
const fs = require('node:fs/promises');
const path = require('node:path');

function sortObjectKeysRecursively(inputObject) {
  if (Array.isArray(inputObject)) {
    const newArray = [];

    for (let i = 0; i < inputObject.length; i++) {
      newArray[i] = sortObjectKeysRecursively(inputObject[i]);
    }

    return newArray;
  }

  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject;
  }

  const newObject = {};

  const sortedKeys = Object.keys(inputObject).sort();

  for (let i = 0; i < sortedKeys.length; i++) {
    newObject[sortedKeys[i]] = sortObjectKeysRecursively(
      inputObject[sortedKeys[i]]
    );
  }

  return newObject;
}

async function getResolvedConfig(testInputFile) {
  return new Promise((resolve, reject) => {
    exec(
      `npx eslint -c test-eslint-config.js --print-config ${testInputFile}`,
      { cwd: __dirname },
      (error, stdOut, stdErr) => {
        if (error) {
          reject(error);
          return;
        }

        if (stdErr) {
          reject(stdErr);
          return;
        }

        if (stdOut.toString().trim() === 'undefined') {
          resolve(undefined);
        } else {
          resolve(stdOut);
        }
      }
    );
  });
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

(async () => {
  const testInputFiles = [
    'config-file.js',
    'src/file.js',
    'src/file.test.js',
    'config-file.ts',
    'src/file.ts',
    'src/file.test.ts',
    'declaration-file.d.ts',
  ];

  const resolvedConfigs = await Promise.all(
    testInputFiles.map(getResolvedConfig)
  );

  for (let i = 0; i < resolvedConfigs.length; i += 1) {
    const testInputFile = testInputFiles[i];

    let resolvedConfig = resolvedConfigs[i];

    if (resolvedConfig) {
      resolvedConfig = postProcessConfig(resolvedConfig);

      const fullFilePath =
        path.join(__dirname, 'configs-snapshots', testInputFile) + '.json';

      await fs.mkdir(path.dirname(fullFilePath), { recursive: true });
      await fs.writeFile(fullFilePath, resolvedConfig);
    } else {
      console.warn(
        `\x1b[33m[WARNING] eslint could not resolve config for file "${testInputFile}"\x1b[0m`
      );
    }
  }
})();
