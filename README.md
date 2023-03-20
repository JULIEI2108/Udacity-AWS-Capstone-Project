# Udacity-AWS-Capstone-Project
This is my Udacity Cloud developer Course final project. In this project I developed and deployed a serverless web application. I built serverless REST APIs using API Gateway and AWS Lambda, stored data in AWS DynamoDB and S3, secured my application with authentication, and deployed it to AWS using the Serverless framework. I deployed my frontend using the AWS Amplify service. My project can be viewed at:
https://julie-configure.d3pw6ogk003r9g.amplifyapp.com/


# Frontend
The art-diary-julie folder contains a web application that allows users to log in to view and manage their artworks. I used Auth0 as the authentication service provider.
Once backend is deployed .env file need to be updated 

`REACT_APP_AUTH0_DOMAIN=<AUTH0 account domain>`

`REACT_APP_AUTH0_CLIENT_ID=<AUTH0 account client id>`

`REACT_APP_APIGATEWAY_ENDPOINT=<Backend endpoint>`

`REACT_APP_FRONTEND_ENDPOINT=<Frontend endpoint>`

To run the frontend locally
```
cd art-diary-julie
npm install
npm run start
```
Please be aware Auth0 doesn't support Authentication from local host. The frontend need to be deployed on internet to be functional. 
Once deployed please update .env file


# Backend
The backend folder contain a serverless app. I use serverless framwork deploy lambda functions, Api Gateway, DynamoDB and S3. It act as backend to allow users to view, create, update and delete items.

NodeJS up to version 12.XX

To deploy serverless app 
```
cd backend
#install dependency and serverless framwork2.21.1
npm install
npm install -g serverless@2.21.1
serverless --version
#configure cli with AWS credentials
aws configure 
# Configure serverless to use the AWS credentials to deploy the application
# You need to have a pair of Access key (YOUR_ACCESS_KEY_ID and YOUR_SECRET_KEY) of an IAM user with Admin access permissions
sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_KEY --profile serverless
# Deploy application
#S3 bucket need to have a unique name, please modify S3 bucket name before deploy
sls deploy
```
once backend is deployed, please update backend endpoint in frontend .env file

# Postman collection

An alternative way to test backend API, you can use the Postman collection that contains sample requests. You can find a Postman collection called artdiary Project.postman_collection.json in this project. To import this collection, do the following.

1. Click on the import button
2. Click on the "Choose Files"
3. Select a file to import:
4. Right click on the imported collection to set variables for the collection:
5. Provide variables for the collection
    `apiId = <Api Gateway ID>`
    `authToken = <AccessToken>`
When you deploy and config frontend correctly and log in through auth0, you can get Access Token in the console.

# This is my first readme documentation. If anyone has questions or suggestions, feel free to leave comments.
# Happy coding!!!



