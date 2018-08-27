import { config } from 'dotenv';
import { lambda } from '../../common/utils/lambda';

/* Will read env variables as set in config file, should be first thing in the app to be executed */
config();

export const get = lambda((event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: 'Welcome to Buckingham Palace'
  });
});
