import { lstatSync, readdirSync } from 'fs';
import path from 'path';
import { log, logError } from '../common/utils/logger';

const decorateFunction = (functionName, func) => async (request, response) => {
  try {
    log(`[${functionName}]: Executing`);
    const funcResponse = await func(request.query);
    log(`[${functionName}]: Response: ${JSON.stringify(funcResponse)}`);
    response.status(200).send(funcResponse);
  } catch (ex) {
    logError(`[${functionName}]`, ex.stack);
    response
      .status(500)
      .send(JSON.stringify(ex.stack));
  }
}

export const addFunctions = app => {
  const functionsPath = path.join(process.cwd(), 'src/functions');
  const functions = readdirSync(functionsPath).filter(functionPath => {
    const absoluteFunctionPath = path.join(functionsPath, functionPath);
    return lstatSync(absoluteFunctionPath).isDirectory();
  });

  functions.forEach(functionName => {
    const absoluteFunctionPath = path.join(functionsPath, functionName, 'index.js');
    const funcMethods = require(absoluteFunctionPath)[functionName];
    for(let method in funcMethods) {
      app[method](`/${functionName}`, decorateFunction(functionName, funcMethods[method]));
    }
  });
};
