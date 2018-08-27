# Lambda Starter Kit

This project aims to take you through the initial learning curve to deploy an API on AWS Lambda.

By following a pattern inside your source code, scripts in this project can auto generate `serverless.yml`, and leverage `serverless` framework to deploy the project on AWS.


## Directory Structure

AWS Lambda functions are organized in `src/functions` directory. For each new API path, create sub directory with the same path name. Each path directory should have an `index.js` file which should export the path methods. The path methods should be wrapped in `lambda` utility function available. This utility function enables to add decorators, loggers to your lambda path handler, and proxy integration to use same method for local deployment.

For e.g.

adding a path `/helloworld`, create a directory with name `helloworld` as `src/functions/helloworld`, and create `index.js` there. Your directory structure should look like below,

```
.
├── src
│   ├── common
│   ├── functions
│   │   ├── helloworld
│   │   │   └── index.js
├── .env
├── README.md
└── package.json
```

`index.js` should export functions decorated with `lambda` as below,

```
import { config } from 'dotenv';
import { lambda } from '../../common/utils/lambda';

/* Will read env variables as set in config file, should be first thing in the app to be executed */
config();

export const get =  lambda((event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'Welcome to White House'
  });
});


export const post = lambda((event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: 'Your letter posted to White House'
  });
});

```
 For the above code, the command `make build` will automatically generate `testGET` and `testPOST` function configuration in `serverless.yml`. However if there is some extra config you want to attach your functions, you can add in the path specific file in `config/functions/`. 
 
For e.g to add environment variables to `testGET` function, simple add below configuration to `config/functions/test.yml`.

```
testGET:
  environment:
    NODE_ENV: production
```

## cli

|command|description|
|---|---|
|`make start`|This will start a local express server at `localhost:5001`. All the api paths and methods will be automatically mounted. So for above configuration, one path with two methods will be available, `GET` `/helloworld` and `POST` `/helloworld`. Any serverless specific config will not be available.|
|`make docker-run`|This will start a local dockerised express server at `localhost:5001`. All other config remains as above. You might need this sometimes so see linux only errors, since docker builds on `node:8.10` image which is the latest `nodejs` version available for aws lambda.|
|`make package`|Generates `serverless.yml` and the deployment package `package.zip`.|
|`make deploy ENV='development'`|Deploy the above generated package to aws. You will need configure credentials first. Pass in `ENV` variable to deploy to correct stage via serverless.|

## `.env` file

If you pass in correct `ENV` variable to `make` target, it will pick up the corresponding `.env` file for the build. Specifying `development` will default to `.env`

For e.g. you can have `staging.env` file in project root directory, to build package for staging `make package ENV='staging'`
