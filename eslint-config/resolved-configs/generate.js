const { exec } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const { createConfigVariation } = require('./eslint.config');
const { extractSupportedTsVersion } = require('./extract-supported-ts-version');
const { createPluginsFile } = require('./list-plugins');

// eslint-disable-next-line no-console
console.error('HRISTO: generate.js | PATH', process.env.Path, process.env.PATH);

function sortObjectKeysRecursively(inputObject) {
  if (Array.isArray(inputObject)) {
    const newArray = [];

    for (let i = 0; i < inputObject.length; i += 1) {
      newArray[i] = sortObjectKeysRecursively(inputObject[i]);
    }

    return newArray;
  }

  if (typeof inputObject !== 'object' || inputObject === null) {
    return inputObject;
  }

  const newObject = {};

  const sortedKeys = Object.keys(inputObject).sort();

  for (let i = 0; i < sortedKeys.length; i += 1) {
    newObject[sortedKeys[i]] = sortObjectKeysRecursively(
      inputObject[sortedKeys[i]]
    );
  }

  return newObject;
}

function postProcessConfig(config) {
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

  return config;
}

async function addResolvedConfig(input) {
  const resolvedConfigJSON = await new Promise((resolve, reject) => {
    exec(
      `npx eslint --print-config ${input.testInputFile}`,
      {
        cwd: __dirname,
        env: {
          variation: input.variation,
        },
      },
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

  let resolved = resolvedConfigJSON
    ? JSON.parse(resolvedConfigJSON)
    : undefined;

  if (resolved) {
    resolved = postProcessConfig(resolved);
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      `\x1b[33m[WARNING] ESLint could not resolve config for file "${input.testInputFile}"\x1b[0m`
    );
  }

  return {
    ...input,
    resolved,
  };
}

const TAG_DELIMITER = '_';

function getConfigVariations() {
  let current = ['base'];

  current = [
    ...current,
    ...current.map((x) => `${x}${TAG_DELIMITER}typescript`),
  ];

  current = [
    ...current,
    ...current.map((x) => `${x}${TAG_DELIMITER}react`),
    ...current.map(
      (x) => `${x}${TAG_DELIMITER}react${TAG_DELIMITER}react-redux`
    ),
  ];

  current = [
    ...current,
    ...current.map((x) => `${x}${TAG_DELIMITER}jest`),
    ...current.map((x) => `${x}${TAG_DELIMITER}vitest`),
  ];

  current = [
    ...current,
    ...current
      .filter((x) => {
        const tags = x.split(TAG_DELIMITER);
        return (
          tags.includes('react') &&
          (tags.includes('jest') || tags.includes('vitest'))
        );
      })
      .map((x) => `${x}${TAG_DELIMITER}rtl`),
  ];

  current.sort();

  return current;
}

function groupBy(items, getGroupKey) {
  const groups = [];

  for (const item of items) {
    const key = getGroupKey(item);

    let group = groups.find((x) => x.key === key);

    if (!group) {
      group = { key, items: [] };

      groups.push(group);
    }

    group.items.push(item);
  }

  return groups;
}

function* chunkArray(items, size) {
  size = size <= 0 ? 1 : size;

  for (let i = 0; i < items.length; i += size) {
    yield items.slice(i, i + size);
  }
}

function getInputConfigs() {
  const jsTestInputFiles = [
    'config-file.js',
    'src/file.js',
    'src/file.test.js',
  ];

  const tsTestInputFiles = [
    'config-file.ts',
    'src/file.ts',
    'src/file.test.ts',
    'declaration-file.d.ts',
  ];

  const configs = [];

  for (const variation of getConfigVariations()) {
    for (const testInputFile of jsTestInputFiles) {
      configs.push({ variation, testInputFile });
    }

    if (variation.split(TAG_DELIMITER).includes('typescript')) {
      for (const testInputFile of tsTestInputFiles) {
        configs.push({ variation, testInputFile });
      }
    }
  }

  return configs;
}

function getNonConfiguredRules(eslintConfigArray, resolvedConfigs) {
  const allRules = new Set(
    resolvedConfigs.flatMap((x) => Object.keys(x.rules))
  );

  const nonConfiguredRules = [];

  for (const eslintConfig of eslintConfigArray) {
    if (eslintConfig.plugins) {
      const plugins = Object.entries(eslintConfig.plugins);

      for (const [pluginName, plugin] of plugins) {
        const rules = Object.entries(plugin.rules);

        for (const [ruleName, rule] of rules) {
          const fullRuleName = `${pluginName}/${ruleName}`;

          if (
            !rule.meta.deprecated &&
            !allRules.has(ruleName) &&
            !allRules.has(fullRuleName)
          ) {
            nonConfiguredRules.push(fullRuleName);
          }
        }
      }
    }
  }

  return nonConfiguredRules;
}

function getDisabledRules(resolvedConfigs) {
  const disabledRules = [];

  for (const config of resolvedConfigs) {
    for (const [ruleName, ruleConfig] of Object.entries(config.rules)) {
      const severity = ruleConfig[0].toLowerCase();

      if (severity === 'off') {
        disabledRules.push(ruleName);
      }
    }
  }

  return disabledRules;
}

async function writeFile(filePath, object) {
  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  });

  await fs.writeFile(filePath, JSON.stringify(object, null, 2));
}

(async () => {
  const groups = groupBy(getInputConfigs(), (config) => config.variation);

  for (const group of groups) {
    const variation = group.key;

    const chunks = [
      ...chunkArray(
        group.items,
        Math.max(1, Math.floor(os.availableParallelism() / 2))
      ),
    ];

    const allConfigs = [];

    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex += 1) {
      const chunk = chunks[chunkIndex];
      const configs = await Promise.all(chunk.map(addResolvedConfig));

      allConfigs.push(...configs);

      // eslint-disable-next-line no-console
      console.info(
        `Resolving ESLint configs for config variation "${variation}"${chunks.length > 1 ? ` [chunk ${chunkIndex + 1} of ${chunks.length}]` : ''}`
      );

      for (const config of configs) {
        if (config.resolved) {
          await writeFile(
            `${path.join(
              __dirname,
              'generated',
              config.variation,
              config.testInputFile
            )}.json`,
            config.resolved
          );
        }
      }
    }

    const resolvedConfigs = allConfigs.map((x) => x.resolved);

    await writeFile(
      path.join(__dirname, 'generated', variation, 'non-configured-rules.json'),
      getNonConfiguredRules(createConfigVariation(variation), resolvedConfigs)
    );

    await writeFile(
      path.join(__dirname, 'generated', variation, 'disabled-rules.json'),
      getDisabledRules(resolvedConfigs)
    );
  }

  await createPluginsFile();
  await extractSupportedTsVersion();
})().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
