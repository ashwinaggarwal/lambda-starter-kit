import { log as logger } from '../utils/logger';

const log = logger.bind(null, '[Authorizer]');

const authorizer = async () => {
  log('Sending 200');
  return 200;
};

export default authorizer;
