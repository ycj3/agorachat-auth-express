## Introduction
Written in Node.js, using [express framework](https://www.npmjs.com/package/express) to create a RESTful webservice for generating user tokens for user with the [Agora's Chat SDK](https://www.agora.io/en/products/chat/).

Agora Advanced Guide: [Secure authentication with tokens](https://docs.agora.io/en/agora-chat/develop/authentication)  
Authentication workflow refer to this [sequence diagram](https://medium.com/@carlsonyuandev/authentication-server-for-agorachat-sequence-diagrams-da4c2992d2aa)

This video below shows how it works:

https://user-images.githubusercontent.com/123744402/223958992-b2d95987-fcac-4763-95dc-3db0d4c4d8df.mov

## Components
* agora-token
* express
* mongodb-memory-server
* mongoose

**Note That**: This project use `mongodb-memory-server` package which holds the data in memory for demonstrating data storage. However, you should use your own database of your backend server for storing data.

## Usage
### Fill in with your information
Open *auth-demo.js* and replace `<YOUR APP ID>` and `<YOUR APP CERTIFICATE>` with your value.  
And also replace `<YOUR RestApiHost>`, `<YOUR OrgName>` and `<YOUR AppName>`.  

```
// Get the appId and appCertificate from the agora console
const appId = "<YOUR APP ID>";

const appCertificate = "<YOUR APP CERTIFICATE>";
// Token expire time, hardcode to 86400 seconds = 1 day

const expirationInSeconds = 86400;

// Get the RestApiHost, OrgName and AppName from the chat feature in agora console
const chatRegisterURL = "https://<YOUR RestApiHost>/<YOUR OrgName>/<YOUR AppName>/users"
```

### Install Dependencies and Run

Install Dependencies
```shell
npm install
```
run the app
```shell
npm run start
```

## Test with CURL

### Register
```curl
curl --request POST \
  --url http://localhost:3000/register \
  --header 'Content-Type: application/json' \
  --data '{
 "account": "wukong",
 "password": "1"
}'
```
Response Example
```json
{
  "success": true,
  "message": "User Registered Sucessfully !",
  "code": "RES_OK"
}
```

### Login
```curl
curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
 "account": "wukong",
 "password": "1"
}'
```
Response Example
```json
{
  "code": "RES_OK",
  "expireTimestamp": 86400,
  "chatUsername": "wukong",
  "accessToken": "007eJxTYHjw+fPKcN8NUtcSo8wOXk+VeOAgtP+DecyF46ov5uldyZdXYDBKTTU2sbBISzMxMDVJNTWzME02NjJJtEiyNDFKtTQ2WKnwP7khkJHhzoEYFkYGVgZGIATxVRhSE01SE9MsDXSTLAzNdA0NU1N0k9KMzHVNU5ITjVMsk5IskpMBNV4qBg=="
}

```
