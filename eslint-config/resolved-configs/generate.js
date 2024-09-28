const { exec } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

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

  return {
    ...input,
    resolved: resolvedConfigJSON ? JSON.parse(resolvedConfigJSON) : undefined,
  };
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

const TAG_DELIMITER = '_';

function addTag(original, tag) {
  return original.map((variation) => variation + TAG_DELIMITER + tag);
}

function addVariations(original, ...tags) {
  const result = [...original];

  for (const tag of tags) {
    result.push(...addTag(original, tag));
  }

  return result;
}

function addReactTestingLibrary(original) {
  const reactVariations = original.filter((x) => {
    const tags = x.split(TAG_DELIMITER);
    return (
      tags.includes('react') &&
      (tags.includes('jest') || tags.includes('vitest'))
    );
  });

  return [...original, ...addTag(reactVariations, 'rtl')];
}

function getConfigVariations() {
  let current = ['base'];

  current = addVariations(current, 'typescript');
  current = addVariations(current, 'react', 'react-redux');
  current = addVariations(current, 'jest', 'vitest');

  current = addReactTestingLibrary(current);

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
  const testInputFiles = [
    'config-file.js',
    'src/file.js',
    'src/file.test.js',
    'config-file.ts',
    'src/file.ts',
    'src/file.test.ts',
    'declaration-file.d.ts',
  ];

  const configs = [];

  for (const variation of getConfigVariations()) {
    for (const testInputFile of testInputFiles) {
      configs.push({ variation, testInputFile });
    }
  }

  return configs;
}

(async () => {
  const groups = groupBy(getInputConfigs(), (config) => config.variation);

  for (const group of groups) {
    const chunks = [
      ...chunkArray(
        group.items,
        Math.min(1, Math.floor(os.availableParallelism() / 2))
      ),
    ];

    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex += 1) {
      const chunk = chunks[chunkIndex];
      const configs = await Promise.all(chunk.map(addResolvedConfig));

      // eslint-disable-next-line no-console
      console.info(
        `Resolving ESLint configs for config variation "${group.key}"${chunks.length > 1 ? ` [chunk ${chunkIndex + 1} of ${chunks.length}]` : ''}`
      );

      for (const config of configs) {
        if (config.resolved) {
          const fullFilePath = `${path.join(
            __dirname,
            'generated',
            config.variation,
            config.testInputFile
          )}.json`;

          await fs.mkdir(path.dirname(fullFilePath), { recursive: true });

          const processedConfig = postProcessConfig(config.resolved);
          const processedConfigJSON = JSON.stringify(processedConfig, null, 2);

          await fs.writeFile(fullFilePath, processedConfigJSON);
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            `\x1b[33m[WARNING] eslint could not resolve config for file "${config.testInputFile}"\x1b[0m`
          );
        }
      }
    }
  }
})();
