import path from 'path';
import yaml from 'js-yaml';
import packageJson from '../../package.json';
import { readFile, writeFile } from '../../src/common/utils';
import { getFunctionsConfig } from './getFunctionsConfig';

const cwd = process.cwd();

const configureProvider = async (config) => {
  const providerConfigRaw = await readFile(
    path.join(cwd, 'config/provider.yml'),
    'utf8'
  );
  const providerConfig = yaml.safeLoad(providerConfigRaw);

  return {
    ...config,
    ...providerConfig,
    provider: {
      ...providerConfig.provider,
      region: process.env.AWS_REGION
    }
  };
};

const configureFunctions = async (config) => {
  const functionsConfig = await getFunctionsConfig();

  return {
    ...config,
    functions: functionsConfig
  };
};

const configureResources = async (config) => {
  const resourcesConfigRaw = await readFile(
    path.join(cwd, 'config/resources.yml'),
    'utf8'
  );

  if (resourcesConfigRaw.trim()) {
    const resourcesConfig = yaml.safeLoad(resourcesConfigRaw || '');
    return {
      ...config,
      resources: resourcesConfig
    };
  }
  return config;
};

const configureServerlessYml = async (config) => {
  return [
    configureProvider,
    configureFunctions,
    configureResources
  ].reduce(async (nwConfig, func) => {
    const newConfig = await nwConfig;
    return func(newConfig);
  }, config);
};

export const generateServerlessConfig = async () => {
  const compiledServerlessYml = await configureServerlessYml({
    service: packageJson.name
  });

  await writeFile(
    path.join(cwd, 'serverless.yml'),
    yaml.safeDump(JSON.parse(JSON.stringify(compiledServerlessYml)))
  );
};
