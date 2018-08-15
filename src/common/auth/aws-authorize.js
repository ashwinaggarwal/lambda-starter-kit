import authorizer from './authorizer';
import { logError } from '../utils/logger';

const generatePolicy = (Effect = 'Deny', Resource) => {
  return {
    Version: '2012-10-17',
    Statement: [{
      Action: [
        'execute-api:Invoke',
        'execute-api:InvalidateCache'
      ],
      Effect,
      Resource
    }]
  };
};

const generateAllowPolicy = (resource) => {
  return generatePolicy('Allow', resource);
};

const generateDenyPolicy = (resource) => {
  return generatePolicy('Deny', resource);
};

const authorize = async ({ queryStringParameters, methodArn }, context, callback) => {
  try {
    const response = await authorizer(queryStringParameters);
    switch (response) {
      case 200:
        callback(null, {
          principalId: queryStringParameters.hash,
          policyDocument: {
            ...generateAllowPolicy(methodArn)
          }
        });
        break;
      default:
        callback({
          principalId: queryStringParameters.hash,
          policyDocument: {
            ...generateDenyPolicy(methodArn)
          }
        });
    }
  } catch (err) {
    logError('[aws-authorize]', err);
    callback(err);
  }
};

export default authorize;
