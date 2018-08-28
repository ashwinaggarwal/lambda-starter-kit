import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { readFile, flatmap } from '../../src/common/utils';
import { getFunctionNames, FUNCTIONS_PATH } from '../../src/common/utils/functions';

const cwd = process.cwd();

const addHttpEventToMethodPreConfig = (preConfig = {}) => {
  const hasHttpEvent = preConfig
    && preConfig.events
    && preConfig.events.filter(event => event.http).length;

  return hasHttpEvent ? preConfig : {
    ...preConfig,
    events: [{ http: {} }].concat(preConfig.events || [])
  };
};

const getFunctionMethodConfig = (functionName, functionPreConfig, functionSrcPath, method) => {
  const methodName = `${functionName}${method.toUpperCase()}`;
  const methodPreConfig = addHttpEventToMethodPreConfig(functionPreConfig[methodName]);

  return {
    [methodName]: {
      ...methodPreConfig,
      handler: `${functionSrcPath}/index.${method}`,
      events: methodPreConfig.events.map(event => (!event.http ? event : {
        ...event,
        http: {
          ...event.http,
          method,
          path: `/${functionName}`
        }
      }))
    }
  };
};

const getFunctionPreConfig = async (functionName) => {
  const functionPreConfigPath = path.join(cwd, 'config/functions', `${functionName}.yml`);

  if (fs.existsSync(functionPreConfigPath)) {
    const functionSpecificConfigRaw = await readFile(functionPreConfigPath, 'utf8');
    return YAML.parse(functionSpecificConfigRaw);
  }
  return {};
};

const getFunctionConfig = async (functionName) => {
  const funcPath = path.join(FUNCTIONS_PATH, functionName);
  const func = require(`${funcPath}/index.js`); /* eslint global-require:0 import/no-dynamic-require:0 */
  const funcPreConfig = await getFunctionPreConfig(functionName);
  const funcRelativePath = path.relative(cwd, funcPath);

  const methodsConfig = await Promise.all(Object.keys(func).map(async (funcMethod) => {
    const functMethodConfig = await getFunctionMethodConfig(
      functionName,
      funcPreConfig,
      funcRelativePath,
      funcMethod
    );
    return functMethodConfig;
  }));

  return methodsConfig;
};

export const getFunctionsConfig = async () => {
  const functionNames = getFunctionNames();
  const functionsConfig = await Promise.all(functionNames.map(getFunctionConfig));

  return flatmap(functionsConfig);
};
