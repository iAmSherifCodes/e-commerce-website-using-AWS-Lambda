# E-commerce website built with AWS CDK

This e-commerce website flexes my ability to use Amazon Cognito, AWS Lambda, ApiGateway, CloudWatch, DynamoDB, EventBridge, SNS, SQS, IAM and more.


- Use this link to play around with the UI- [here](https://mieiey4cu2.execute-api.us-east-1.amazonaws.com/dev/)
- The website basically shows various products. You can search for a range of products by their theme, like "Harry Potter" or "Rick and Morty".

## Application Overview
- You must sign in to be authorized to search. This authentication is handled with Amazon Cognito.
- CloudWatch for Log tracing and debugging.
- Lambda for compute
- ApiGateway for our RestFul APIs
- DynamoDB, NoSql database.

