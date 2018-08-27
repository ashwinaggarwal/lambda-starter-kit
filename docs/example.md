## Sample Project Structure

For the sample project structure as the current stage of the project with the project tree as below,

```
.
├── Dockerfile
├── Makefile
├── README.md
├── config
│   ├── functions
│   │   └── test.yml
│   ├── provider.yml
│   └── resources.yml
├── docs
│   └── example.md
├── package-lock.json
├── package.json
├── serverless.yml
├── src
│   ├── functions
│   │   ├── test
│   │   │   └── index.js
│   │   └── test1
│   │       └── index.js
└── staging.env
```
Running `make package ENV='development'` will generate below two files/packages.

```
.
├── package.zip
└── serverless.yml
```

Generated [`serverless.yml`](../serverless.yml)


After fetching aws credentials, and running `make deploy ENV='development'`, and serverless will start deploying your functions to aws lambda, following logs would be seen,

```
Deploying to AWS via Serverless for development
Serverless: Packaging service...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - lambda-starter-kit-development
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - lambda-starter-kit-development
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (27.12 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - lambda-starter-kit-development
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - TestGETLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - Test1GETLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - TestPOSTLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - TestGETLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - Test1GETLogGroup
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - TestGETLogGroup
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - Test1GETLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - TestPOSTLogGroup
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - TestPOSTLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceTest1
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceTest
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceTest1
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Resource - ApiGatewayResourceTest
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceTest
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Resource - ApiGatewayResourceTest1
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTestOptions
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTestOptions
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodTestOptions
CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - TestPOSTLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - TestPOSTLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - TestPOSTLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - Test1GETLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - TestGETLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTestPost
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - TestPOSTLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - TestPOSTLambdaVersionP6pH2uuCitOMdyy8x2pO9Iet3eby3c4t8rYf3udM
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTestPost
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - TestPOSTLambdaPermissionApiGateway
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodTestPost
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - Test1GETLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - TestGETLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - TestPOSTLambdaVersionP6pH2uuCitOMdyy8x2pO9Iet3eby3c4t8rYf3udM
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - Test1GETLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - TestGETLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - TestPOSTLambdaVersionP6pH2uuCitOMdyy8x2pO9Iet3eby3c4t8rYf3udM
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - Test1GETLambdaVersionlUKAtKxt6MqM1GRz41UpbL3gfvlLtwiDjZw0BGRTvYA
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTest1Get
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTestGet
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - TestGETLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - Test1GETLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - TestGETLambdaVersionQ52OcMd53Co6RhNkZmIEBddixL0bTXPfCQ8ZhNE7J8
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTestGet
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Method - ApiGatewayMethodTest1Get
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - TestGETLambdaPermissionApiGateway
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - Test1GETLambdaPermissionApiGateway
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodTestGet
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Method - ApiGatewayMethodTest1Get
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - Test1GETLambdaVersionlUKAtKxt6MqM1GRz41UpbL3gfvlLtwiDjZw0BGRTvYA
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - TestGETLambdaVersionQ52OcMd53Co6RhNkZmIEBddixL0bTXPfCQ8ZhNE7J8
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - Test1GETLambdaVersionlUKAtKxt6MqM1GRz41UpbL3gfvlLtwiDjZw0BGRTvYA
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - TestGETLambdaVersionQ52OcMd53Co6RhNkZmIEBddixL0bTXPfCQ8ZhNE7J8
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1535385071310
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1535385071310
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1535385071310
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Permission - TestPOSTLambdaPermissionApiGateway
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Permission - TestGETLambdaPermissionApiGateway
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Permission - Test1GETLambdaPermissionApiGateway
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - lambda-starter-kit-development
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - lambda-starter-kit-development
Serverless: Stack update finished...
Service Information
service: lambda-starter-kit
stage: development
region: eu-west-1
stack: lambda-starter-kit-development
api keys:
  None
endpoints:
  GET - https://l3e7ffx407.execute-api.eu-west-1.amazonaws.com/development/test
  POST - https://l3e7ffx407.execute-api.eu-west-1.amazonaws.com/development/test
  GET - https://l3e7ffx407.execute-api.eu-west-1.amazonaws.com/development/test1
functions:
  testGET: lambda-starter-kit-development-testGET
  testPOST: lambda-starter-kit-development-testPOST
  test1GET: lambda-starter-kit-development-test1GET

Stack Outputs
TestGETLambdaFunctionQualifiedArn: arn:aws:lambda:eu-west-1:487943794540:function:lambda-starter-kit-development-testGET:1
TestPOSTLambdaFunctionQualifiedArn: arn:aws:lambda:eu-west-1:487943794540:function:lambda-starter-kit-development-testPOST:1
Test1GETLambdaFunctionQualifiedArn: arn:aws:lambda:eu-west-1:487943794540:function:lambda-starter-kit-development-test1GET:1
ServiceEndpoint: https://l3e7ffx407.execute-api.eu-west-1.amazonaws.com/development
ServerlessDeploymentBucketName: lambda-starter-kit-devel-serverlessdeploymentbuck-fal98cxv7qel

```

Functions are deployed, and the endpoints are logged above! 🎉
