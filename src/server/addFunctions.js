import path from 'path';
import { log, logError } from '../common/utils/logger';
import { FUNCTIONS_PATH, getFunctionNames } from '../common/utils/functions';

const withCallback = (func, event, context) => {
  return new Promise((resolve, reject) => {
    const callback = (err, response) => {
      if (err) {
        reject(err);
      }
      resolve(response);
    };

    try {
      func(event, context, callback);
    } catch (ex) {
      reject(ex);
    }
  });
};

const decorateFunction = (functionName, func) => async (request, response) => {
  try {
    log(`[${functionName}]`, 'Executing');
    const {
      statusCode,
      body
    } = await withCallback(func, request, {
      LOCAL_EXECUTION_ENV: true
    });
    log(`[${functionName}]`, statusCode, JSON.stringify(body));
    response.status(statusCode).send(body);
  } catch (ex) {
    logError(`[${functionName}]`, ex);
    response
      .status(500)
      .send(ex.stack);
  }
};

export const addFunctions = async (app) => {
  const functions = getFunctionNames();

  functions.forEach((functionName) => {
    const absoluteFunctionPath = path.join(FUNCTIONS_PATH, functionName, 'index.js');
    const funcMethods = require(absoluteFunctionPath); /* eslint global-require:0, import/no-dynamic-require:0, max-len:0 */
    Object.keys(funcMethods).forEach((funcMethod) => {
      app[funcMethod](`/${functionName}`, decorateFunction(functionName, funcMethods[funcMethod]));
    });
  });
};
