import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import merge from 'deepmerge';
import packageJson from '../../package.json';
import { readFile, writeFile } from '../../src/common/utils';
import { getFunctionNames, FUNCTIONS_PATH } from '../../src/common/utils/functions';

const cwd = process.cwd();

const configureServerlessYml = async (config) => {
  return await [
    configureProvider,
    configureFunctions,
    configureResources
  ].reduce(async (nwConfig, func) => {
    const newConfig = await nwConfig;
    return func(newConfig);
  }, config);
};

const configureProvider = async (config) => {
  config.provider = {
    ...config.provider,
    region: process.env.AWS_REGION
  };
  return config;
};

const configureFunctions = async (config) => {
  const functionNames = getFunctionNames();
  const functionsConfig =  await functionNames.reduce(async (nwConfig, functionName) => {
    let functionSpecificConfig = {};
    let newConfig = await nwConfig;
    const functionPath = path.join(FUNCTIONS_PATH, functionName);
    const func = require(`${functionPath}/index.js`);
    const relativeFunctionPath = path.relative(cwd, functionPath);
    const functionSpeficiConfigPath = path.join(cwd, 'config/functions', `${functionName}.yml`);

    if(fs.existsSync(functionSpeficiConfigPath)) {
      const functionSpecificConfigRaw = await readFile(functionSpeficiConfigPath, 'utf8');
      functionSpecificConfig = YAML.parse(functionSpecificConfigRaw);
    }

    Object.keys(func).forEach(functionMethod => {
      const methodName = `${functionName}${functionMethod.toUpperCase()}`;
      const methodConfig = functionSpecificConfig[methodName];

      const httpEvent = methodConfig && methodConfig.events ?
        methodConfig.events.filter(event => !!event.http)[0].http : {};

      const nonHttpEvents = methodConfig && methodConfig.events ?
        methodConfig.events.filter(event => !event.http) : [];

      if (methodConfig && methodConfig.events) {
        delete methodConfig.events;
      }

      newConfig[methodName] = {
        handler: `${relativeFunctionPath}/index.${functionMethod}`,
        events: [
          ...nonHttpEvents,
          {
            http: {
              ...httpEvent,
              method: functionMethod,
              path: `/${functionName}`
            }
          }
        ]
      };
    });

    return merge(newConfig,functionSpecificConfig);

  }, {});

  return {
    ...config,
    functions: functionsConfig
  };
};

const configureResources = async (config) => {
  return config;
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
