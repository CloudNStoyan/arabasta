const { exec } = require('node:child_process');
const fs = require('node:fs/promises');
const path = require('node:path');

function sortObjectKeysAlphabetically(obj) {
  const entries = Object.entries(obj);

  entries.sort((a, b) => a[0].localeCompare(b[0]));

  return Object.fromEntries(entries);
}

function sortArrayAlphabetically(array) {
  return array.toSorted((a, b) => a.localeCompare(b));
}

const NUMBER_TO_SEVERITY_MAP = { 0: 'off', 1: 'warn', 2: 'error' };

function postProcessConfig(configContent) {
  const config = JSON.parse(configContent);

  config.languageOptions.globals = sortObjectKeysAlphabetically(
    config.languageOptions.globals
  );

  config.plugins = sortArrayAlphabetically(config.plugins);

  const rulesEntries = Object.entries(config.rules);

  rulesEntries.sort((a, b) => a[0].localeCompare(b[0]));

  for (const rule of rulesEntries) {
    const [ruleName, ruleOptions] = rule;

    if (Array.isArray(ruleOptions)) {
      const severity = ruleOptions[0];

      ruleOptions[0] = NUMBER_TO_SEVERITY_MAP[severity];
    } else {
      // This isn't supposed to happen
      throw new Error(
        `Rule Options must always be an array, but this is not the case for: ${ruleName}`
      );
    }
  }

  config.rules = Object.fromEntries(rulesEntries);

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
