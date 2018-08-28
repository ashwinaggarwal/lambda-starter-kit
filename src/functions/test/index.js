import { config } from 'dotenv';
import { lambda } from '../../common/utils/lambda';

/* Will read env variables as set in config file, should be first thing in the app to be executed */
config();

export const get = lambda((event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'Welcome to White House'
  });
});


export const post = lambda((event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
    },
    body: 'Your letter posted to White House'
  });
});
