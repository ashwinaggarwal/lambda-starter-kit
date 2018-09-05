import { config } from 'dotenv';
import { lambda } from '../../common/utils/lambda';
import { log as logger } from '../../common/utils/logger';

const log = logger.bind('[kinesisTest]');

/* Will read env variables as set in config file, should be first thing in the app to be executed */
config();

export const get = lambda((event, context, callback) => {
  // process logs here

  log('Event', JSON.stringify(event));
  return callback(null, {
    statusCode: 200,
    body: 'Healthy and receiving logs'
  });
});
