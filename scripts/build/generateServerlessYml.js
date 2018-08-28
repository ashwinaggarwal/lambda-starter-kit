import path from 'path';
import YAML from 'yaml';
import packageJson from '../../package.json';
import { readFile, writeFile } from '../../src/common/utils';
import { getFunctionsConfig } from './getFunctionsConfig';

const cwd = process.cwd();

const configureProvider = async (config) => {
  config.provider = {
    ...config.provider,
    region: process.env.AWS_REGION
  };
  return config;
};

const configureFunctions = async (config) => {
  const functionsConfig = await getFunctionsConfig();

  return {
    ...config,
    functions: functionsConfig
  };
};

const configureResources = async (config) => {
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
  const serverlessConfigBaseFilePath = path.join(cwd, 'config/provider.yml');

  const serverlessConfigBaseFileRaw = await readFile(serverlessConfigBaseFilePath, 'utf8');

  const compiledServerlessYml = await configureServerlessYml({
    service: packageJson.name,
    ...YAML.parse(serverlessConfigBaseFileRaw)
  });

  await writeFile(
    path.join(cwd, 'serverless.yml'),
    YAML.stringify(compiledServerlessYml)
  );
};
