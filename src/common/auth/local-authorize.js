import authorizer from './authorizer';
import { logError } from '../utils/logger';

const authorize = async (request, response, next) => {
  try {
    const responseCode = await authorizer(request.query);
    switch (responseCode) {
      case 200:
        next();
        break;
      default:
        response.status(responseCode).send();
    }
  } catch (err) {
    logError('[local-authorize]', err);
    response.status(500).send(err);
  }
};

export default authorize;
