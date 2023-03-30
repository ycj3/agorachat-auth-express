# AgoraChat Auth express WebServer
Written in Node.js, using `express` framework to create a RESTful webservice for generating user tokens for user with the AgoraChat's [Chat SDK](https://www.agora.io/en/products/chat/).

> This project use `mongodb-memory-server` package which holds the data in memory for demonstrating data storage. However, you should use your own database of your backend server for storing data.<br>

If something doesn't work, please [file an issue](https://github.com/CarlsonYuan/agorachat-auth-express/issues/new).<br>

## Core Code
> **Warning**  
> Need to use npm package `agora-token`. `agora-access-token` is now deprecated. refer to AgoraIO Tools [issues](https://github.com/AgoraIO/Tools/issues/324).
```
import agoraToken from 'agora-token'
const appToken = ChatTokenBuilder.buildAppToken(appId, appCertificate, expirationInSeconds);
```
> **Warning**  
> Need to use `user's uuid` (generated from Chat Rest Register User [API](https://docs.agora.io/en/agora-chat/restful-api/user-system-registration?platform=android#registering-a-user)) not `user's id`. refer to Agora [doc](https://docs.agora.io/en/agora-chat/develop/authentication?platform=android)
```
const userToken = ChatTokenBuilder.buildUserToken(appId, appCertificate, <user's uuid>, expirationInSeconds);
```




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
