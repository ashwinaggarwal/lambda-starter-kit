import { config } from 'dotenv';
import { generateServerlessConfig } from './generateServerlessYml';

config();

generateServerlessConfig();
