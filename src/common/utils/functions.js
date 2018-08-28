import { lstatSync, readdirSync } from 'fs';
import path from 'path';

export const FUNCTIONS_PATH = path.join(process.cwd(), 'src/functions');

export const getFunctionNames = () => {
  return readdirSync(FUNCTIONS_PATH).filter((functionPath) => {
    const absoluteFunctionPath = path.join(FUNCTIONS_PATH, functionPath);
    return lstatSync(absoluteFunctionPath).isDirectory();
  });
};
